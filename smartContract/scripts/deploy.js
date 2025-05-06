const { ethers } = require("hardhat");
const { keccak256, toUtf8Bytes } = require("ethers");

async function main() {
  console.log("Deploying FacultyProfile contract...");

  // Get the deployer and faculty accounts
  const [deployer, faculty] = await ethers.getSigners();
  console.log("Deploying with account (admin):", deployer.address);
  console.log("Assigning FACULTY_MEMBER role to:", faculty.address);

  // Deploy the contract with faculty address
  const FacultyProfile = await ethers.getContractFactory("FacultyProfile");
  const facultyProfile = await FacultyProfile.deploy(deployer.address, faculty.address);

  // Wait for the contract to be deployed
  await facultyProfile.waitForDeployment();

  console.log("FacultyProfile deployed to:", facultyProfile.target);

  // Verify roles
  const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;
  const ADMIN_ROLE = keccak256(toUtf8Bytes("ADMIN"));
  const FACULTY_MEMBER_ROLE = keccak256(toUtf8Bytes("FACULTY_MEMBER"));

  console.log("Verifying roles...");
  console.log(
    "Deployer has ADMIN role:",
    await facultyProfile.hasRole(ADMIN_ROLE, deployer.address),
  );
  console.log(
    "Deployer has DEFAULT_ADMIN_ROLE:",
    await facultyProfile.hasRole(DEFAULT_ADMIN_ROLE, deployer.address),
  );
  console.log(
    "Faculty has FACULTY_MEMBER role:",
    await facultyProfile.hasRole(FACULTY_MEMBER_ROLE, faculty.address),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports.tags = ["all"];
