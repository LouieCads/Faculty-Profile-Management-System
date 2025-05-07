'use client'; // Add this if using Next.js App Router
import React, { useState } from 'react';
import Link from 'next/link';
import { House, UserRound, ListCheck, Cog, X, Clock, Check, Bell, FileDown } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import "./adminHomepage.css";

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534', // green-800
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4B5563', // gray-600
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: '1px solid #E5E7EB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#166534', // green-800
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  statsBox: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    width: '30%',
  },
  statsTitle: {
    fontSize: 10,
    color: '#4B5563', // gray-600
    marginBottom: 5,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534', // green-800
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 5,
  },
  tableHeaderCell: {
    width: '50%',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#166534', // green-800
  },
  tableCell: {
    width: '50%',
    fontSize: 10,
    color: '#4B5563', // gray-600
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#9CA3AF', // gray-400
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  }
});

// Create PDF Document component
const ComplianceReport = () => {
  // Generate current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Sample compliance data
  const complianceData = {
    disapproved: 3,
    pending: 3,
    approved: 2,
    totalFaculty: 35,
    submissionsThisWeek: 23,
    mostCompliantDept: "Computer Science",
    totalDocuments: 89,
  };

  // Sample department compliance data
  const departmentData = [
    { name: "Computer Science", compliance: "87%", totalDocs: 32 },
    { name: "Information Technology", compliance: "78%", totalDocs: 28 },
    { name: "Information Systems", compliance: "65%", totalDocs: 21 },
    { name: "Data Science", compliance: "52%", totalDocs: 8 },
  ];

  // Sample recent submissions
  const recentSubmissions = [
    { name: 'Dellosa', document: 'diploma.png', status: 'Pending', date: '2025-05-06' },
    { name: 'Dorin', document: 'diploma.png', status: 'Approved', date: '2025-05-06' },
    { name: 'Pahayahay', document: 'diploma.png', status: 'Disapproved', date: '2025-05-05' },
    { name: 'Edgar', document: 'diploma.png', status: 'Pending', date: '2025-05-05' },
    { name: 'Dela Cruz', document: 'diploma.png', status: 'Approved', date: '2025-05-04' },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with logo placeholder */}
        <View style={styles.logoContainer}>
          {/* In a real implementation, you'd use an actual logo image */}
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: '#166534',
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ color: 'white', fontSize: 24 }}>CCIS</Text>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerText}>Faculty Compliance Report</Text>
          <Text style={styles.subHeader}>Generated on: {currentDate}</Text>
        </View>

        {/* Compliance Status Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compliance Status Overview</Text>
          <View style={styles.statsRow}>
            <View style={[styles.statsBox, { backgroundColor: '#FEE2E2' }]}>
              <Text style={styles.statsTitle}>Disapproved</Text>
              <Text style={styles.statsValue}>{complianceData.disapproved}</Text>
            </View>
            <View style={[styles.statsBox, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.statsTitle}>Pending</Text>
              <Text style={styles.statsValue}>{complianceData.pending}</Text>
            </View>
            <View style={[styles.statsBox, { backgroundColor: '#DCFCE7' }]}>
              <Text style={styles.statsTitle}>Approved</Text>
              <Text style={styles.statsValue}>{complianceData.approved}</Text>
            </View>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.row}>
            <Text style={styles.tableHeaderCell}>Total Faculty Members:</Text>
            <Text style={styles.tableCell}>{complianceData.totalFaculty}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.tableHeaderCell}>Submissions This Week:</Text>
            <Text style={styles.tableCell}>{complianceData.submissionsThisWeek}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.tableHeaderCell}>Most Compliant Department:</Text>
            <Text style={styles.tableCell}>{complianceData.mostCompliantDept}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.tableHeaderCell}>Total Documents:</Text>
            <Text style={styles.tableCell}>{complianceData.totalDocuments}</Text>
          </View>
        </View>

        {/* Department Compliance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Department Compliance</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Department</Text>
            <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Compliance</Text>
            <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Total Docs</Text>
          </View>
          {departmentData.map((dept, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '50%' }]}>{dept.name}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{dept.compliance}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{dept.totalDocs}</Text>
            </View>
          ))}
        </View>

        {/* Recent Submissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Submissions</Text>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Name</Text>
            <Text style={[styles.tableHeaderCell, { width: '30%' }]}>Document</Text>
            <Text style={[styles.tableHeaderCell, { width: '25%' }]}>Status</Text>
            <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Date</Text>
          </View>
          {recentSubmissions.map((submission, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: '25%' }]}>{submission.name}</Text>
              <Text style={[styles.tableCell, { width: '30%' }]}>{submission.document}</Text>
              <Text style={[styles.tableCell, { width: '25%' }]}>{submission.status}</Text>
              <Text style={[styles.tableCell, { width: '20%' }]}>{submission.date}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>This report is auto-generated by the CCIS Faculty Compliance System</Text>
          <Text>Report ID: CCIS-FCR-{Date.now().toString().substr(-8)}</Text>
        </View>
      </Page>
    </Document>
  );
};

const AdminHomePage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const recentSubmissions = [
    { name: 'Dellosa', document: 'diploma.png' },
    { name: 'Dorin', document: 'diploma.png' },
    { name: 'Pahayahay', document: 'diploma.png' },
    { name: 'Edgar', document: 'diploma.png' },
    { name: 'Dela Cruz', document: 'diploma.png' },
    { name: 'Juan', document: 'diploma.png' },
  ];

  const recentAccounts = [
    'Althea Reyes',
    'Miguel Santos',
    'Lorenzo Dela Cruz',
    'Isabela Navarro',
    'Joaquin Mendoza',
  ];
  
  const notifications = [
    { id: 1, message: 'Dellosa submitted diploma.png', time: '5 minutes ago', isRead: false },
    { id: 2, message: 'Dorin submitted diploma.png', time: '10 minutes ago', isRead: false },
    { id: 3, message: 'New account created: Althea Reyes', time: '1 hour ago', isRead: true },
    { id: 4, message: 'Document approved: Juan\'s diploma.png', time: '3 hours ago', isRead: true },
    { id: 5, message: 'System update completed', time: '1 day ago', isRead: true },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleGenerateReport = () => {
    setIsGeneratingPDF(true);
    // In a real application, you might want to do some data fetching here
    // before generating the PDF
  };

  return (
    <div className="flex h-screen">
      {showNotifications && (
        <div
          className="fixed inset-0 bg-opacity-30 z-10"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}

      <div className="leftContainer">
        <div className="sideBar">
          <img src="./Images/CCIS.png" alt="" className="logo" />
          <div className="sideBar">
            <Link href="/Admin-Homepage">
              <div className=" p-2 hover:bg-green-700 rounded-md cursor-pointer mb-6">
                <House color="#ffffff" strokeWidth={2} />
              </div>
            </Link>
            <Link href="/Account-Management">
              <div className=" p-2 hover:bg-green-700 rounded-md cursor-pointer mb-6">
                <UserRound color="#ffffff" strokeWidth={2} />
              </div>
            </Link>
            <Link rel="stylesheet" href="/Admin-Submission-Review">
              <div className=" p-2 hover:bg-green-700 rounded-md cursor-pointer mb-6">
                <ListCheck color="#ffffff" strokeWidth={2} />
              </div>
            </Link>
            <div className=" p-2 hover:bg-green-700 rounded-md cursor-pointer">
              <Cog color="#ffffff" strokeWidth={2} />
            </div>{" "}
          </div>{" "}

        </div>
      </div>

      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="h-16 border-b px-6 flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center">
            {/* <div className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                className="text-green-800 pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-green-800"
              />
              <div className="absolute left-3 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div> */}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              <button
                className="text-gray-600 hover:text-gray-800 relative"
                onClick={toggleNotifications}
              >
                <Bell size={22} />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20 border border-gray-200">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-semibold text-green-800">
                      Notifications
                    </h3>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotifications(false);
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                              !notification.isRead ? "bg-green-50" : ""
                            }`}
                          >
                            <div className="flex justify-between">
                              <p className="text-sm text-green-800 font-medium">
                                {notification.message}
                              </p>
                              {!notification.isRead && (
                                <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-2 text-center border-t border-gray-200">
                    <button className="text-sm text-green-800 hover:text-green-900 font-medium">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-sm font-semibold text-gray-600">JP</span>
            </div>
          </div>
        </div>

        <div className="flex p-6 gap-6 flex-1">
          <div className="w-1/3 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-green-800 text-lg font-bold mb-2">
                Recently Submitted
              </h2>
              <hr className="border-gray-200 mb-4" />
              <ul className="space-y-2">
                {recentSubmissions.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-800 mr-2">•</span>
                    <p className="text-green-800">
                      {item.name} submitted {item.document}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-green-800 text-lg font-bold mb-2">
                Recently Created Account
              </h2>
              <hr className="border-gray-200 mb-4" />
              <ul className="space-y-2">
                {recentAccounts.map((name, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-800 mr-2">•</span>
                    <p className="text-green-800">{name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-2/3">
            <div className="bg-white rounded-lg shadow p-6 h-full">
              {/* Improved Compliance Status Section */}
              <h2 className="text-green-800 text-2xl font-bold text-center mb-8">
                Compliance Status
              </h2>

              <div className="flex justify-between items-start px-6 mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-3">
                    <X color="white" size={32} />
                  </div>
                  <p className="text-green-800 font-medium mb-1">Disapproved</p>
                  <p className="text-4xl font-bold text-green-800">03</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-3">
                    <Clock color="white" size={32} />
                  </div>
                  <p className="text-green-800 font-medium mb-1">
                    Pending Approval
                  </p>
                  <p className="text-4xl font-bold text-green-800">03</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-800 rounded-full flex items-center justify-center mb-3">
                    <Check color="white" size={32} />
                  </div>
                  <p className="text-green-800 font-medium mb-1">Approved</p>
                  <p className="text-4xl font-bold text-green-800">02</p>
                </div>
              </div>

              {/* Improved Analytics Cards */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white border border-gray-100 rounded-lg shadow p-5 text-center">
                  <p className="text-green-800 font-medium mb-2">
                    Total Faculty
                  </p>
                  <p className="text-3xl font-bold text-green-800">35</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg shadow p-5 text-center">
                  <p className="text-green-800 font-medium mb-2">
                    Submissions This Week
                  </p>
                  <p className="text-3xl font-bold text-green-800">23</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg shadow p-5 text-center">
                  <p className="text-green-800 font-medium mb-2">
                    Most Compliant Dept
                  </p>
                  <p className="text-2xl font-bold text-green-800">
                    Computer Science
                  </p>
                </div>
                <div className="bg-white border border-gray-100 rounded-lg shadow p-5 text-center">
                  <p className="text-green-800 font-medium mb-2">
                    Total Documents
                  </p>
                  <p className="text-3xl font-bold text-green-800">89</p>
                </div>
              </div>

              {/* PDF Download Button */}
              <div className="flex justify-center">
                {isGeneratingPDF ? (
                  <PDFDownloadLink 
                    document={<ComplianceReport />} 
                    fileName="faculty-compliance-report.pdf"
                    className="bg-green-800 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow text-lg flex items-center space-x-2"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 
                      'Generating PDF...' : 
                      <div className="flex items-center">
                        <FileDown className="mr-2" size={20} />
                        Download Report
                      </div>
                    }
                  </PDFDownloadLink>
                ) : (
                  <button 
                    onClick={handleGenerateReport}
                    className="bg-green-800 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow text-lg flex items-center"
                  >
                    Generate Report
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;