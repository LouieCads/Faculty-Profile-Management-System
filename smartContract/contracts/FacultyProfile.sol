// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract FacultyProfile is AccessControl {
    bytes32 public constant ADMIN = keccak256("ADMIN");
    bytes32 public constant FACULTY_MEMBER = keccak256("FACULTY_MEMBER");

    // Struct to store faculty profile
    struct PersonalInfo {
        // string did; // Decentralized Identifier (e.g., did:ethr:0x123...)
        string firstName;
        string middleName;
        string lastName;
        string suffix;
        string birthday;
        string civilStatus;
        string homeAddress;
        uint256 contactNum;
        string email;
        string telephoneNum;
        bool isApproved; // Approval status
        bool exists; // Track if profile exists
    }
    struct EducationalBackground {
        // string did; // Decentralized Identifier (e.g., did:ethr:0x123...)
        string elementarySchoolName;
        uint256 elementaryDateGraduated;
        string elementarySchoolAddress;
        string highschoolSchoolName;
        uint256 highschoolDateGraduated;
        string highschoolSchoolAddress;
        string collegeSchoolName;
        uint256 collegeDateGraduated;
        string collegeSchoolAddress;
        bool isApproved; // Approval status
        bool exists; // Track if profile exists
    }
    struct WorkExperience {
        // string did; // Decentralized Identifier (e.g., did:ethr:0x123...)
        string companyName;
        uint256 yearsServed;
        string position;
        bool isApproved; // Approval status
        bool exists; // Track if profile exists
    }
    struct LicensesAndCertifications {
        // string did; // Decentralized Identifier (e.g., did:ethr:0x123...)
        string profession;
        string dateAchieved;
        string licensesAndCertificationsIpfsHash;
        bool isApproved; // Approval status
        bool exists; // Track if profile exists
    }
    struct TeachingAssignments {
        // string did; // Decentralized Identifier (e.g., did:ethr:0x123...)
        string elementarySchoolName;
        string elementaryDateGraduate;
        string elementarySchoolAddress;
        bool isApproved; // Approval status
        bool exists; // Track if profile exists
    }
    struct ResearchOutputs {
        // string did; // Decentralized Identifier (e.g., did:ethr:0x123...)
        string researchTitle;
        string researchOutputsIpfsHash;
        uint256 datePublished;
        bool isApproved; // Approval status
        bool exists; // Track if profile exists
    }
    struct SupportingDocuments {
        // string did; // Decentralized Identifier (e.g., did:ethr:0x123...)
        string diplomaIpfsHash;
        string serviceRecordsIpfsHash;
        string certificatesIpfsHash;
        bool isApproved; // Approval status
        bool exists; // Track if profile exists
    }

    mapping(address => PersonalInfo) public personalInfo;
    mapping(address => EducationalBackground) public educationalBackground;
    mapping(address => WorkExperience) public workExperience;
    mapping(address => LicensesAndCertifications)
        public licensesAndCertifications;
    mapping(address => TeachingAssignments) public teachingAssignments;
    mapping(address => ResearchOutputs) public researchOutputs;
    mapping(address => SupportingDocuments) public supportingDocuments;

    event PersonalInfoSubmitted(address indexed faculty);
    event PersonalInfoApproved(address indexed faculty, address indexed admin);

    constructor(address deployerAddress, address facultyAddress) {
        require(facultyAddress != address(0) && deployerAddress!= address(0), "Faculty address cannot be zero");
        _grantRole(DEFAULT_ADMIN_ROLE, deployerAddress);
        _grantRole(ADMIN, deployerAddress);
        _grantRole(FACULTY_MEMBER, facultyAddress);
    }

    function submitPersonalInfo(
        string memory _firstName,
        string memory _middleName,
        string memory _lastName,
        string memory _suffix,
        string memory _birthday,
        string memory _civilStatus,
        string memory _homeAddress,
        uint256 _contactNum,
        string memory _email,
        string memory _telephoneNum
    ) public onlyRole(FACULTY_MEMBER) {
        require(
            !personalInfo[msg.sender].exists,
            "Personal Information already submitted"
        );

        personalInfo[msg.sender] = PersonalInfo(
            _firstName,
            _middleName,
            _lastName,
            _suffix,
            _birthday,
            _civilStatus,
            _homeAddress,
            _contactNum,
            _email,
            _telephoneNum,
            false, // Not approved initially
            true // Profile exists
        );

        emit PersonalInfoSubmitted(msg.sender);
    }

    function submitEducationalBackground(
        string memory _elementarySchoolName,
        uint256 _elementaryDateGraduated,
        string memory _elementarySchoolAddress,
        string memory _highschoolSchoolName,
        uint256 _highschoolDateGraduated,
        string memory _highschoolSchoolAddress,
        string memory _collegeSchoolName,
        uint256 _collegeDateGraduated,
        string memory _collegeSchoolAddress
    ) public onlyRole(FACULTY_MEMBER) {
        require(
            !educationalBackground[msg.sender].exists,
            "Educational Background already submitted"
        );

        educationalBackground[msg.sender] = EducationalBackground(
            _elementarySchoolName,
            _elementaryDateGraduated,
            _elementarySchoolAddress,
            _highschoolSchoolName,
            _highschoolDateGraduated,
            _highschoolSchoolAddress,
            _collegeSchoolName,
            _collegeDateGraduated,
            _collegeSchoolAddress,
            false, // Not approved initially
            true // Profile exists
        );
    }

    function submitWorkExperience(
        string memory _companyName,
        uint256 _yearsServed,
        string memory _position
    ) public onlyRole(FACULTY_MEMBER) {
        require(
            !workExperience[msg.sender].exists,
            "Work Experience already submitted"
        );

        workExperience[msg.sender] = WorkExperience(
            _companyName,
            _yearsServed,
            _position,
            false, // Not approved initially
            true // Profile exists
        );
    }

    function submitLicensesAndCertifications(
        string memory _profession,
        string memory _dateAchieved,
        string memory _licensesAndCertificationsIpfsHash
    ) public onlyRole(FACULTY_MEMBER) {
        require(
            !licensesAndCertifications[msg.sender].exists,
            "Licenses and Certifications already submitted"
        );

        licensesAndCertifications[msg.sender] = LicensesAndCertifications(
            _profession,
            _dateAchieved,
            _licensesAndCertificationsIpfsHash,
            false, // Not approved initially
            true // Profile exists
        );
    }

    function submitTeachingAssignments(
        string memory _elementarySchoolName,
        string memory _elementaryDateGraduate,
        string memory _elementarySchoolAddress
    ) public onlyRole(FACULTY_MEMBER) {
        require(
            !teachingAssignments[msg.sender].exists,
            "Teaching Assignments already submitted"
        );

        teachingAssignments[msg.sender] = TeachingAssignments(
            _elementarySchoolName,
            _elementaryDateGraduate,
            _elementarySchoolAddress,
            false, // Not approved initially
            true // Profile exists
        );
    }

    function submitResearchOutputs(
        string memory _researchTitle,
        string memory _researchOutputsIpfsHash,
        uint256 _datePublished
    ) public onlyRole(FACULTY_MEMBER) {
        require(
            !researchOutputs[msg.sender].exists,
            "Research Outputs already submitted"
        );

        researchOutputs[msg.sender] = ResearchOutputs(
            _researchTitle,
            _researchOutputsIpfsHash,
            _datePublished,
            false, // Not approved initially
            true // Profile exists
        );
    }

    function submitSupportingDocuments(
        string memory _diplomaIpfsHash,
        string memory _serviceRecordsIpfsHash,
        string memory _certificatesIpfsHash
    ) public onlyRole(FACULTY_MEMBER) {
        require(
            !supportingDocuments[msg.sender].exists,
            "Supporting Documents already submitted"
        );

        supportingDocuments[msg.sender] = SupportingDocuments(
            _diplomaIpfsHash,
            _serviceRecordsIpfsHash,
            _certificatesIpfsHash,
            false, // Not approved initially
            true // Profile exists
        );
    }

    // Admin approves profile
    function approvePersonalInfo(address _faculty) public onlyRole(ADMIN) {
        require(
            personalInfo[_faculty].exists,
            "Personal Information does not exist"
        );
        require(!personalInfo[_faculty].isApproved, "Profile already approved");
        personalInfo[_faculty].isApproved = true;
        emit PersonalInfoApproved(_faculty, msg.sender);
    }

    function getPersonalInfo(
        address facultyAddress
    )
        public
        view
        returns (
            string memory firstName,
            string memory middleName,
            string memory lastName,
            string memory suffix,
            string memory birthday,
            string memory civilStatus,
            string memory homeAddress,
            uint256 contactNum,
            string memory email,
            string memory telephoneNum,
            bool isApproved,
            bool exists
        )
    {
        PersonalInfo memory profile = personalInfo[facultyAddress];
        require(profile.exists, "Profile does not exist");

        return (
            profile.firstName,
            profile.middleName,
            profile.lastName,
            profile.suffix,
            profile.birthday,
            profile.civilStatus,
            profile.homeAddress,
            profile.contactNum,
            profile.email,
            profile.telephoneNum,
            profile.isApproved,
            profile.exists
        );
    }

    function getEducationalBackground(
        address facultyAddress
    )
        public
        view
        returns (
            string memory elementarySchoolName,
            uint256 elementaryDateGraduated,
            string memory elementarySchoolAddress,
            string memory highschoolSchoolName,
            uint256 highschoolDateGraduated,
            string memory highschoolSchoolAddress,
            string memory collegeSchoolName,
            uint256 collegeDateGraduated,
            string memory collegeSchoolAddress,
            bool isApproved,
            bool exists
        )
    {
        EducationalBackground memory education = educationalBackground[
            facultyAddress
        ];
        require(education.exists, "Educational Background does not exist");

        return (
            education.elementarySchoolName,
            education.elementaryDateGraduated,
            education.elementarySchoolAddress,
            education.highschoolSchoolName,
            education.highschoolDateGraduated,
            education.highschoolSchoolAddress,
            education.collegeSchoolName,
            education.collegeDateGraduated,
            education.collegeSchoolAddress,
            education.isApproved,
            education.exists
        );
    }

    function getWorkExperience(
        address facultyAddress
    )
        public
        view
        returns (
            string memory companyName,
            uint256 yearsServed,
            string memory position,
            bool isApproved,
            bool exists
        )
    {
        WorkExperience memory experience = workExperience[facultyAddress];
        require(experience.exists, "Work Experience does not exist");

        return (
            experience.companyName,
            experience.yearsServed,
            experience.position,
            experience.isApproved,
            experience.exists
        );
    }

    function getLicensesAndCertifications(
        address facultyAddress
    )
        public
        view
        returns (
            string memory profession,
            string memory dateAchieved,
            string memory licensesAndCertificationsIpfsHash,
            bool isApproved,
            bool exists
        )
    {
        LicensesAndCertifications memory licenses = licensesAndCertifications[
            facultyAddress
        ];
        require(licenses.exists, "Licenses and Certifications do not exist");

        return (
            licenses.profession,
            licenses.dateAchieved,
            licenses.licensesAndCertificationsIpfsHash,
            licenses.isApproved,
            licenses.exists
        );
    }

    function getTeachingAssignments(
        address facultyAddress
    )
        public
        view
        returns (
            string memory elementarySchoolName,
            string memory elementaryDateGraduate,
            string memory elementarySchoolAddress,
            bool isApproved,
            bool exists
        )
    {
        TeachingAssignments memory teaching = teachingAssignments[
            facultyAddress
        ];
        require(teaching.exists, "Teaching Assignments do not exist");

        return (
            teaching.elementarySchoolName,
            teaching.elementaryDateGraduate,
            teaching.elementarySchoolAddress,
            teaching.isApproved,
            teaching.exists
        );
    }

    function getResearchOutputs(
        address facultyAddress
    )
        public
        view
        returns (
            string memory researchTitle,
            string memory researchOutputsIpfsHash,
            uint256 datePublished,
            bool isApproved,
            bool exists
        )
    {
        ResearchOutputs memory research = researchOutputs[facultyAddress];
        require(research.exists, "Research Outputs do not exist");

        return (
            research.researchTitle,
            research.researchOutputsIpfsHash,
            research.datePublished,
            research.isApproved,
            research.exists
        );
    }

    function getSupportingDocuments(
        address facultyAddress
    )
        public
        view
        returns (
            string memory diplomaIpfsHash,
            string memory serviceRecordsIpfsHash,
            string memory certificatesIpfsHash,
            bool isApproved,
            bool exists
        )
    {
        SupportingDocuments memory documents = supportingDocuments[
            facultyAddress
        ];
        require(documents.exists, "Supporting Documents do not exist");

        return (
            documents.diplomaIpfsHash,
            documents.serviceRecordsIpfsHash,
            documents.certificatesIpfsHash,
            documents.isApproved,
            documents.exists
        );
    }
}
