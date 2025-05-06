const { ethers, deployments, getNamedAccounts, network } = require("hardhat");
const { expect } = require("chai");
const { keccak256, toUtf8Bytes } = require("ethers");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Faculty Profile Tests", () => {
      let facultyProfile;
      let deployer;
      let user1;
      let user2;
      let ADMIN_ROLE;
      let FACULTY_MEMBER_ROLE;
      let DEFAULT_ADMIN_ROLE;

      beforeEach(async () => {
        // Get accounts
        [deployer, user1, user2] = await ethers.getSigners();

        // Deploy the contract
        const FacultyProfile = await ethers.getContractFactory(
          "FacultyProfile",
          deployer,
        );
        facultyProfile = await FacultyProfile.deploy(deployer.address, user1.address);
        await facultyProfile.waitForDeployment();

        // Get role hashes
        DEFAULT_ADMIN_ROLE = ethers.ZeroHash;
        ADMIN_ROLE = keccak256(toUtf8Bytes("ADMIN"));
        FACULTY_MEMBER_ROLE = keccak256(toUtf8Bytes("FACULTY_MEMBER"));
      });

      describe("Role Management", () => {
        it("should set the deployer as DEFAULT_ADMIN_ROLE", async () => {
          const hasRole = await facultyProfile.hasRole(
            DEFAULT_ADMIN_ROLE,
            deployer.address,
          );
          expect(hasRole).to.be.true;
        });

        it("should set the deployer as ADMIN", async () => {
          const hasRole = await facultyProfile.hasRole(
            ADMIN_ROLE,
            deployer.address,
          );
          expect(hasRole).to.be.true;
        });

        it("should allow admin to grant FACULTY_MEMBER role", async () => {
          // Admin grants FACULTY_MEMBER role to user1
          await facultyProfile
            .connect(deployer)
            .grantRole(FACULTY_MEMBER_ROLE, user1.address);

          // Check if user1 has FACULTY_MEMBER role
          const hasRole = await facultyProfile.hasRole(
            FACULTY_MEMBER_ROLE,
            user1.address,
          );
          expect(hasRole).to.be.true;
        });

        it("should prevent non-admin from granting FACULTY_MEMBER role", async () => {
          // User1 tries to grant FACULTY_MEMBER role to user2
          await expect(
            facultyProfile
              .connect(user1)
              .grantRole(FACULTY_MEMBER_ROLE, user2.address),
          )
            .to.be.revertedWithCustomError(
              facultyProfile,
              "AccessControlUnauthorizedAccount",
            )
            .withArgs(user1.address, DEFAULT_ADMIN_ROLE);

          // Verify user2 doesn't have the role
          const hasRole = await facultyProfile.hasRole(
            FACULTY_MEMBER_ROLE,
            user2.address,
          );
          expect(hasRole).to.be.false;
        });

        it("should allow admin to revoke FACULTY_MEMBER role", async () => {
          // First grant the role
          await facultyProfile
            .connect(deployer)
            .grantRole(FACULTY_MEMBER_ROLE, user1.address);

          // Then revoke it
          await facultyProfile
            .connect(deployer)
            .revokeRole(FACULTY_MEMBER_ROLE, user1.address);

          // Check if the role was revoked
          const hasRole = await facultyProfile.hasRole(
            FACULTY_MEMBER_ROLE,
            user1.address,
          );
          expect(hasRole).to.be.false;
        });

        it("should prevent non-admin from revoking FACULTY_MEMBER role", async () => {
          // First grant the role to user1
          await facultyProfile
            .connect(deployer)
            .grantRole(FACULTY_MEMBER_ROLE, user1.address);

          // User2 tries to revoke user1's role
          await expect(
            facultyProfile
              .connect(user2)
              .revokeRole(FACULTY_MEMBER_ROLE, user1.address),
          )
            .to.be.revertedWithCustomError(
              facultyProfile,
              "AccessControlUnauthorizedAccount",
            )
            .withArgs(user2.address, DEFAULT_ADMIN_ROLE);

          // Verify user1 still has the role
          const hasRole = await facultyProfile.hasRole(
            FACULTY_MEMBER_ROLE,
            user1.address,
          );
          expect(hasRole).to.be.true;
        });
      });

      // Test personal info submission
      describe("Personal Info Submission", () => {
        beforeEach(async () => {
          // Grant FACULTY_MEMBER role to faculty
          await facultyProfile
            .connect(deployer)
            .grantRole(FACULTY_MEMBER_ROLE, user1.address);
        });

        it("should allow faculty to submit personal info", async () => {
          const personalInfo = {
            firstName: "Louigie",
            middleName: "Caday",
            lastName: "Caminoy",
            suffix: "",
            birthday: "1990-01-01",
            civilStatus: "Single",
            homeAddress: "123 Main St",
            contactNum: 1234567890,
            email: "louie@umak.edu.ph",
            telephoneNum: "555-1234-121",
          };

          // Submit personal info
          await expect(
            facultyProfile
              .connect(user1)
              .submitPersonalInfo(
                personalInfo.firstName,
                personalInfo.middleName,
                personalInfo.lastName,
                personalInfo.suffix,
                personalInfo.birthday,
                personalInfo.civilStatus,
                personalInfo.homeAddress,
                personalInfo.contactNum,
                personalInfo.email,
                personalInfo.telephoneNum,
              ),
          )
            .to.emit(facultyProfile, "PersonalInfoSubmitted")
            .withArgs(user1.address);

          // Retrieve and verify personal info
          const profile = await facultyProfile.getPersonalInfo(user1.address);
          expect(profile.firstName).to.equal(personalInfo.firstName);
          expect(profile.lastName).to.equal(personalInfo.lastName);
          expect(Number(profile.contactNum)).to.equal(personalInfo.contactNum); // Convert BigNumber to number
          expect(profile.email).to.equal(personalInfo.email);
          expect(profile.isApproved).to.be.false;
          expect(profile.exists).to.be.true;
        });

        it("should prevent non-faculty from submitting personal info", async () => {
          await expect(
            facultyProfile
              .connect(user2)
              .submitPersonalInfo(
                "Jane",
                "N",
                "Smith",
                "",
                "1995-02-02",
                "Married",
                "456 Oak St",
                9876543210,
                "jane@example.com",
                "555-5678",
              ),
          )
            .to.be.revertedWithCustomError(
              facultyProfile,
              "AccessControlUnauthorizedAccount",
            )
            .withArgs(user2.address, FACULTY_MEMBER_ROLE);
        });

        it("should prevent duplicate personal info submission", async () => {
          // Submit personal info
          await facultyProfile
            .connect(user1)
            .submitPersonalInfo(
              "John",
              "M",
              "Doe",
              "",
              "1990-01-01",
              "Single",
              "123 Main St",
              1234567890,
              "john@example.com",
              "555-1234",
            );

          // Attempt to submit again
          await expect(
            facultyProfile
              .connect(user1)
              .submitPersonalInfo(
                "John",
                "M",
                "Doe",
                "",
                "1990-01-01",
                "Single",
                "123 Main St",
                1234567890,
                "john@example.com",
                "555-1234",
              ),
          ).to.be.revertedWith("Personal Information already submitted");
        });
      });

      // Test personal info retrieval
      describe("Personal Info Retrieval", () => {
        beforeEach(async () => {
          // Grant FACULTY_MEMBER role and submit personal info
          await facultyProfile
            .connect(deployer)
            .grantRole(FACULTY_MEMBER_ROLE, user1.address);
          await facultyProfile
            .connect(user1)
            .submitPersonalInfo(
              "John",
              "M",
              "Doe",
              "",
              "1990-01-01",
              "Single",
              "123 Main St",
              1234567890,
              "john@example.com",
              "555-1234",
            );
        });

        it("should retrieve existing personal info", async () => {
          const profile = await facultyProfile.getPersonalInfo(user1.address);
          expect(profile.firstName).to.equal("John");
          expect(profile.lastName).to.equal("Doe");
          expect(profile.isApproved).to.be.false;
          expect(profile.exists).to.be.true;
        });

        it("should revert for non-existent personal info", async () => {
          await expect(
            facultyProfile.getPersonalInfo(user2.address),
          ).to.be.revertedWith("Profile does not exist");
        });
      });

      // Test personal info retrieval
      describe("Personal Info Approval", () => {
        beforeEach(async () => {
          // Grant FACULTY_MEMBER role and submit personal info
          await facultyProfile
            .connect(deployer)
            .grantRole(FACULTY_MEMBER_ROLE, user1.address);
          await facultyProfile
            .connect(user1)
            .submitPersonalInfo(
              "John",
              "M",
              "Doe",
              "",
              "1990-01-01",
              "Single",
              "123 Main St",
              1234567890,
              "john@example.com",
              "555-1234",
            );
        });

        it("should allow admin to approve personal info and emit event", async () => {
          await expect(
            facultyProfile.connect(deployer).approvePersonalInfo(user1.address),
          )
            .to.emit(facultyProfile, "PersonalInfoApproved")
            .withArgs(user1.address, deployer.address);
        });
        it("should prevent non-admin from approving personal info", async () => {
          await expect(
            facultyProfile.connect(user2).approvePersonalInfo(user1.address),
          )
            .to.be.revertedWithCustomError(
              facultyProfile,
              "AccessControlUnauthorizedAccount",
            )
            .withArgs(user2.address, ADMIN_ROLE);
        });
        it("should revert if personal info does not exist", async () => {
          await expect(
            facultyProfile.connect(deployer).approvePersonalInfo(user2.address),
          ).to.be.revertedWith("Personal Information does not exist");
        });
        it("should not allow approving an already approved profile", async () => {
          // First approval
          await facultyProfile
            .connect(deployer)
            .approvePersonalInfo(user1.address);

          // Attempt second approval
          await expect(
            facultyProfile.connect(deployer).approvePersonalInfo(user1.address),
          ).to.be.revertedWith("Profile already approved");

          // Verify profile remains approved
          const profile = await facultyProfile.getPersonalInfo(user1.address);
          expect(profile.isApproved).to.be.true;
        });
      });
    });
