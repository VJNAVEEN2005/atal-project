import React, { useEffect, useState } from 'react'
import { 
    Mail, 
    Phone, 
    Droplet, 
    Calendar, 
    User, 
    Heart, 
    MapPin, 
    Target, 
    Code, 
    Palette, 
    Monitor,
    Award,
    TrendingUp,
    Star,
    FileText,
    CheckCircle,
    BookOpen,
    Users,
    Clock,
    GraduationCap,
    Building,
    Layers
} from 'lucide-react'
import axios from 'axios';
import api from '../Api/api';
import { useLocation } from 'react-router-dom';

const StudentRecords = () => {
    const location = useLocation();
    const { emailId, userId: userId } = location.state || {};
    //const [userId, setUserId] = useState("AICPECFSTUCD6727B623");
    const [internshipRecords, setInternshipRecords] = useState([]);
    const [projectRecords, setProjectRecords] = useState([]);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        // Sample internship data matching your API response

        // Sample project data
        const sampleProjectData = [
            {
                "_id": "687d288882dc731741588539",
                "name": "Student 1",
                "registerNumber": "2201107000",
                "userId": "AICPECFSTUCD6727B623",
                "department": "Computer Science",
                "yearOfStudy": "3rd Year",
                "instituteName": "Pondicherry Engineering College",
                "projectType": "MAJOR PROJECT",
                "otherProjectType": "",
                "projectTitle": "AI-Powered Student Management System",
                "labEquipmentUsage": "High-end workstations, GPU clusters",
                "projectDuration": "6 months",
                "projectGuideName": "Dr. Smith",
                "projectMembers": [
                    {
                        "name": "Student 1",
                        "regNo": "2201107000",
                        "department": "Computer Science",
                        "yearOfStudy": "3rd Year",
                        "_id": "687d228b82dc731741588515"
                    },
                    {
                        "name": "Student 2",
                        "regNo": "2201107001",
                        "department": "Computer Science",
                        "yearOfStudy": "3rd Year",
                        "_id": "687d228b82dc731741588516"
                    }
                ],
                "components": [
                    "React Frontend",
                    "Node.js Backend",
                    "MongoDB Database",
                    "Machine Learning Models"
                ],
                "status": "completed",
                "__v": 0
            },
            {
                "_id": "687d288882dc731741588540",
                "name": "Student 1",
                "registerNumber": "2201107000",
                "userId": "AICPECFSTUCD6727B623",
                "department": "Computer Science",
                "yearOfStudy": "2nd Year",
                "instituteName": "Pondicherry Engineering College",
                "projectType": "MINI PROJECT",
                "otherProjectType": "",
                "projectTitle": "E-commerce Website",
                "labEquipmentUsage": "Basic development setup",
                "projectDuration": "3 months",
                "projectGuideName": "Prof. Johnson",
                "projectMembers": [
                    {
                        "name": "Student 1",
                        "regNo": "2201107000",
                        "department": "Computer Science",
                        "yearOfStudy": "2nd Year",
                        "_id": "687d228b82dc731741588517"
                    }
                ],
                "components": [
                    "HTML/CSS",
                    "JavaScript",
                    "PHP",
                    "MySQL"
                ],
                "status": "completed",
                "__v": 0
            }
        ];
        
        // Simulate loading time
        // setTimeout(() => {
        //     setInternshipRecords(sampleInternshipData);
        //     setProjectRecords(sampleProjectData);
        //     setLoading(false);
        // }, 1500);

        // Replace the setTimeout above with this for actual API call:


        axios.get(`${api.web}api/v1/user/${userId}/projects`).then((res) => {
            console.log("Project Records:", res.data);
            setProjectRecords(res.data.data);
        }).catch((error) => {
            console.error("Error fetching project records:", error);
        });

        axios.get(`${api.web}api/v1/internships/email/${emailId}`).then((res) => {
            console.log("Student Records:", res.data);
            setInternshipRecords(res.data.data);
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching records:", error);
            setLoading(false);
        });

        // TODO: Add project API call when available
        // axios.get(`${api.web}api/v1/projects/user/${userId}`).then((res) => {
        //     setProjectRecords(res.data.data);
        // }).catch((error) => {
        //     console.error("Error fetching project records:", error);
        // });
        
        // For now, use sample project data
        setProjectRecords(sampleProjectData);
        
    }, [userId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const getDuration = (startDate, endDate) => {
        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
        if (days > 30) {
            return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''}`;
        }
        return `${days} day${days > 1 ? 's' : ''}`;
    };

    const getProjectTypeIcon = (projectType) => {
        switch (projectType) {
            case 'MAJOR PROJECT':
                return <GraduationCap className="w-6 h-6" />;
            case 'MINI PROJECT':
                return <BookOpen className="w-6 h-6" />;
            case 'OTHERS':
                return <Layers className="w-6 h-6" />;
            default:
                return <Layers className="w-6 h-6" />;
        }
    };

    const getDesignationIcon = (designation) => {
        switch (designation) {
            case 'REACT':
                return <Code className="w-6 h-6" />;
            case 'Figma':
                return <Palette className="w-6 h-6" />;
            default:
                return <Monitor className="w-6 h-6" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
                <div className="container mx-auto px-6 py-12">
                    <div className="flex flex-col items-center justify-center min-h-96">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200" style={{ borderTopColor: '#3f6197' }}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#3f6197', opacity: 0.3 }}></div>
                            </div>
                        </div>
                        <p className="mt-6 font-medium animate-pulse" style={{ color: '#3f6197' }}>Loading student records...</p>
                    </div>
                </div>
            </div>
        );
    }

    const studentInfo = internshipRecords[0]; // Since all records are for the same student

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-6 py-8">
                {internshipRecords.length === 0 && projectRecords.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3f6197 0%, #5a7db8 100%)' }}>
                            <FileText className="w-16 h-16 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700 mb-4">No Records Found</h3>
                        <p className="text-gray-500 text-lg">No internship or project records available for this user.</p>
                    </div>
                ) : (
                    <>
                        {/* Enhanced Student Profile Header */}
                        <div className="mb-12">
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                                {/* Background Pattern */}
                                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <defs>
                                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3f6197" strokeWidth="0.5"/>
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#grid)" />
                                    </svg>
                                </div>
                                
                                {/* Header Section */}
                                <div className="relative p-8" style={{ background: 'linear-gradient(135deg, #3f6197 0%, #2d4a73 100%)' }}>
                                    <div className="flex flex-col lg:flex-row items-center lg:items-start">
                                        <div className="relative mb-6 lg:mb-0 lg:mr-8">
                                            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-30">
                                                <span className="text-3xl font-bold text-white">
                                                    {getInitials(internshipRecords[0]?.name || projectRecords[0]?.name || 'Student')}
                                                </span>
                                            </div>
                                           
                                        </div>
                                        <div className="text-center lg:text-left flex-1">
                                            <h1 className="text-4xl font-bold text-white mb-3">
                                                {internshipRecords[0]?.name || projectRecords[0]?.name || 'Student Name'}
                                            </h1>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                                                <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
                                                    <span className="text-white font-medium text-sm">
                                                        ID: {internshipRecords[0]?.userId || projectRecords[0]?.userId || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
                                                    <span className="text-white font-medium text-sm">
                                                        {internshipRecords.length} Internship{internshipRecords.length !== 1 ? 's' : ''} • {projectRecords.length} Project{projectRecords.length !== 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Student Details Grid */}
                                <div className="p-8">
                                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                                        {[
                                            { icon: Mail, label: 'Email Address', value: internshipRecords[0]?.emailId || 'N/A', color: 'from-blue-500 to-blue-600' },
                                            { icon: Phone, label: 'Phone Number', value: internshipRecords[0]?.phoneNumber || 'N/A', color: 'from-green-500 to-green-600' },
                                            { icon: Droplet, label: 'Blood Group', value: internshipRecords[0]?.bloodGroup || 'N/A', color: 'from-red-500 to-red-600' },
                                            { icon: Calendar, label: 'Date of Birth', value: internshipRecords[0]?.dateOfBirth ? formatDate(internshipRecords[0].dateOfBirth) : 'N/A', color: 'from-purple-500 to-purple-600' },
                                            { icon: User, label: 'Father\'s Name', value: internshipRecords[0]?.fatherName || 'N/A', color: 'from-indigo-500 to-indigo-600' },
                                            { icon: Heart, label: 'Marital Status', value: internshipRecords[0]?.maritalStatus ? internshipRecords[0].maritalStatus.charAt(0).toUpperCase() + internshipRecords[0].maritalStatus.slice(1) : 'N/A', color: 'from-pink-500 to-pink-600' },
                                            { icon: MapPin, label: 'Address', value: internshipRecords[0]?.permanentAddress || 'N/A', color: 'from-orange-500 to-orange-600' },
                                            { icon: Building, label: 'Institute', value: projectRecords[0]?.instituteName || 'N/A', color: 'from-teal-500 to-teal-600' }
                                        ].map((item, index) => (
                                            <div key={index} className="group">
                                                <div className="bg-gradient-to-r p-0.5 rounded-2xl transition-all duration-300 hover:scale-105" style={{ backgroundImage: `linear-gradient(135deg, ${item.color.split(' ')[0]?.replace('from-', '')}, ${item.color.split(' ')[2]?.replace('to-', '')})` }}>
                                                    <div className="bg-white rounded-2xl p-5 h-full">
                                                        <div className="flex items-center mb-3">
                                                            <item.icon className="w-6 h-6 mr-3 text-gray-600" />
                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-bold text-gray-800 text-lg leading-tight">{item.value}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Internship Records Section */}
                        {internshipRecords.length > 0 && (
                            <>
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                            Internship Portfolio
                                        </h2>
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-white rounded-full px-4 py-2 shadow-lg">
                                                <span className="text-sm font-medium" style={{ color: '#3f6197' }}>
                                                    {internshipRecords.length} Programs Completed
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Internship Cards */}
                                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 mb-16">
                                    {internshipRecords.map((record, index) => (
                                        <div key={record._id} className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                                            <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform group-hover:scale-[1.02]">
                                                {/* Card Header with Gradient */}
                                                <div className="relative p-6" style={{ background: `linear-gradient(135deg, #3f6197 0%, ${index % 2 === 0 ? '#2d4a73' : '#4a6ba0'} 100%)` }}>
                                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                                            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" className="animate-spin" style={{animationDuration: '20s'}} />
                                                        </svg>
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                                                <div className="text-white">
                                                                    {getDesignationIcon(record.designation)}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                                                                    <span className="text-xs font-medium text-white">#{record.internNo.split('/')[1]}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h3 className="text-2xl font-bold text-white mb-2">{record.designation}</h3>
                                                        <p className="text-blue-100 text-sm font-medium">{record.internNo}</p>
                                                    </div>
                                                </div>

                                                {/* Card Body */}
                                                <div className="p-6 space-y-6">
                                                    {/* Timeline */}
                                                    <div className="relative">
                                                        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-4">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Timeline</span>
                                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                                                    {getDuration(record.dateOfJoining, record.dateOfExpiry)}
                                                                </span>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <p className="text-xs text-gray-500 mb-1">Start Date</p>
                                                                    <p className="font-bold text-gray-800">{formatDate(record.dateOfJoining)}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 mb-1">End Date</p>
                                                                    <p className="font-bold text-gray-800">{formatDate(record.dateOfExpiry)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className="flex justify-center">
                                                        <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm border-2 ${
                                                            record.status === 'active' 
                                                            ? 'bg-green-50 text-green-700 border-green-200' 
                                                            : 'bg-gray-50 text-gray-700 border-gray-200'
                                                        }`}>
                                                            <div className={`w-2 h-2 rounded-full mr-2 ${
                                                                record.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                                                            }`}></div>
                                                            {record.status === 'active' ? 'Currently Active' : 'Completed'}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card Footer */}
                                                <div className="px-6 pb-6">
                                                    <button 
                                                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                                        onClick={() => alert(`Viewing certificate for ${record.designation} internship (${record.internNo})`)}
                                                    >
                                                        <div className="flex items-center justify-center">
                                                            <FileText className="w-5 h-5 mr-2" />
                                                            View Certificate
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Project Records Section */}
                        {projectRecords.length > 0 && (
                            <>
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                            Project Portfolio
                                        </h2>
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-white rounded-full px-4 py-2 shadow-lg">
                                                <span className="text-sm font-medium" style={{ color: '#3f6197' }}>
                                                    {projectRecords.length} Projects Completed
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Project Cards */}
                                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 mb-16">
                                    {projectRecords.map((project, index) => (
                                        <div key={project._id} className="group relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3f6197] to-[#253e67] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                                            <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform group-hover:scale-[1.02]">
                                                {/* Card Header with Gradient */}
                                                <div className="relative p-6 bg-gradient-to-r from-[#3f6197] to-[#253e67]" >
                                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                                            <polygon points="50,10 90,90 10,90" fill="none" stroke="white" strokeWidth="2" className="animate-pulse" />
                                                        </svg>
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                                                <div className="text-white">
                                                                    {getProjectTypeIcon(project.projectType)}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                                                                    <span className="text-xs font-medium text-white">
                                                                        {project.projectType === 'OTHERS' ? project.otherProjectType : project.projectType}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{project.projectTitle}</h3>
                                                        <p className="text-purple-100 text-sm font-medium">{project.department} • {project.yearOfStudy}</p>
                                                    </div>
                                                </div>

                                                {/* Card Body */}
                                                <div className="p-6 space-y-6">
                                                    {/* Project Details */}
                                                    <div className="space-y-4">
                                                        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-4">
                                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                                <div>
                                                                    <div className="flex items-center mb-2">
                                                                        <Clock className="w-4 h-4 mr-2 text-gray-600" />
                                                                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Duration</span>
                                                                    </div>
                                                                    <p className="font-bold text-gray-800">{project.projectDuration}</p>
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center mb-2">
                                                                        <User className="w-4 h-4 mr-2 text-gray-600" />
                                                                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Guide</span>
                                                                    </div>
                                                                    <p className="font-bold text-gray-800">{project.projectGuideName}</p>
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Team Members */}
                                                            <div className="mb-4">
                                                                <div className="flex items-center mb-2">
                                                                    <Users className="w-4 h-4 mr-2 text-gray-600" />
                                                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Team ({project.projectMembers.length})</span>
                                                                </div>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {project.projectMembers.map((member, idx) => (
                                                                        <div key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                                                            {member.name}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Technologies Used */}
                                                            {project.components && project.components.length > 0 && project.components[0] !== "" && (
                                                                <div>
                                                                    <div className="flex items-center mb-2">
                                                                        <Layers className="w-4 h-4 mr-2 text-gray-600" />
                                                                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Technologies</span>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {project.components.map((component, idx) => (
                                                                            <div key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                                                                                {component}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div className="flex justify-center">
                                                        <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm border-2 ${
                                                            project.status === 'completed' 
                                                            ? 'bg-green-50 text-green-700 border-green-200' 
                                                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                        }`}>
                                                            <div className={`w-2 h-2 rounded-full mr-2 ${
                                                                project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                                            }`}></div>
                                                            {project.status === 'completed' ? 'Completed' : 'In Progress'}
                                                        </div>
                                                    </div>
                                                </div>

                                                
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Achievement Summary */}
                        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Achievement Summary
                            </h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                {[
                                    { 
                                        icon: Award, 
                                        title: 'Internships Completed', 
                                        value: internshipRecords.length.toString(),
                                        color: 'from-blue-400 to-blue-500'
                                    },
                                    { 
                                        icon: BookOpen, 
                                        title: 'Projects Completed', 
                                        value: projectRecords.length.toString(),
                                        color: 'from-purple-400 to-purple-500'
                                    },
                                    { 
                                        icon: TrendingUp, 
                                        title: 'Total Experience (Internships)', 
                                        value: `${internshipRecords.reduce((total, record) => 
                                            total + Math.ceil((new Date(record.dateOfExpiry) - new Date(record.dateOfJoining)) / (1000 * 60 * 60 * 24)), 0)} Days`,
                                        color: 'from-green-400 to-green-500'
                                    },
                                    { 
                                        icon: Target, 
                                        title: 'Success Rate (Internships)', 
                                        value: `${internshipRecords.length > 0 ? Math.round((internshipRecords.filter(record => record.status === 'completed').length / internshipRecords.length) * 100) : 100}%`,
                                        color: 'from-yellow-400 to-orange-500'
                                    },
     
                                ].map((stat, index) => (
                                    <div key={index} className="text-center group">
                                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <stat.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-gray-700 mb-1">{stat.title}</h4>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentRecords;