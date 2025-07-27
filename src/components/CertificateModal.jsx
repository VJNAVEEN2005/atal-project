import React, { useRef } from 'react';
import { Modal, Button, ScrollArea } from '@mantine/core';
import { X, Download, Award, Calendar, User, FileText, Verified, Star } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateModal = ({ isOpen, onClose, record, type = 'internship' }) => {
  const certificateRef = useRef();

  if (!isOpen || !record) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDuration = (startDate, endDate) => {
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (days > 30) {
      return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''}`;
    }
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  const downloadCertificate = async () => {
    try {
      const element = certificateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const fileName = type === 'internship' 
        ? `${record.name}_Internship_Certificate_${record.internNo?.replace(/[/\\:*?"<>|]/g, '_')}.pdf`
        : `${record.name}_Project_Certificate_${record.projectTitle?.replace(/[/\\:*?"<>|]/g, '_')}.pdf`;
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size="90%"
      padding={0}
      radius="xl"
      centered
      scrollAreaComponent={ScrollArea.Autosize}
      styles={{
        modal: {
          maxWidth: '1200px',
          maxHeight: '95vh',
        },
        header: {
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          padding: '1.5rem',
        },
        title: {
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        },
        body: {
          padding: 0,
        },
      }}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Award className="w-7 h-7 mr-3" style={{ color: '#3f6197' }} />
          Certificate of {type === 'internship' ? 'Internship' : 'Project Completion'}
        </div>
      }
      closeButtonProps={{
        size: 'lg',
        radius: 'xl',
        style: { backgroundColor: '#f3f4f6' }
      }}
    >
      {/* Modal Header with Download Button */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-end">
          <Button
            onClick={downloadCertificate}
            leftSection={<Download className="w-5 h-5" />}
            radius="xl"
            size="md"
            style={{
              backgroundColor: '#3f6197',
              '&:hover': {
                backgroundColor: '#2d4a73',
              },
            }}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {/* Certificate Content */}
      <ScrollArea style={{ height: 'calc(95vh - 200px)' }}>
        <div className="p-8">
          <div
            ref={certificateRef}
            className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-12 rounded-2xl border-8 border-[#3f6197] relative overflow-hidden mx-auto"
            style={{ 
              aspectRatio: '297/210',
              minHeight: '600px',
              maxWidth: '1000px'
            }}
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="certificate-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1" fill="#3f6197"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#certificate-pattern)" />
              </svg>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-[#3f6197] opacity-30 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-[#3f6197] opacity-30 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-[#3f6197] opacity-30 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-[#3f6197] opacity-30 rounded-br-lg"></div>

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#3f6197] to-[#5a7db8] rounded-full mb-4 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-[#3f6197] mb-2">CERTIFICATE</h1>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                OF {type === 'internship' ? 'INTERNSHIP COMPLETION' : 'PROJECT COMPLETION'}
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#3f6197] to-[#5a7db8] mx-auto rounded-full"></div>
            </div>

            {/* Main Content */}
            <div className="text-center mb-8 relative z-10">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                This is to certify that
              </p>
              
              <div className="bg-white bg-opacity-70 rounded-2xl p-6 mb-6 border-2 border-[#3f6197] border-opacity-20">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{record.name}</h3>
                <p className="text-lg text-gray-600">
                  {type === 'internship' ? `Student ID: ${record.userId}` : `Registration Number: ${record.registerNumber}`}
                </p>
              </div>

              <p className="text-lg text-gray-600 mb-6">
                has successfully completed {type === 'internship' ? 'an internship' : 'a project'} in
              </p>

              <div className="bg-gradient-to-r from-[#3f6197] to-[#5a7db8] text-white rounded-2xl p-6 mb-6">
                <h4 className="text-2xl font-bold mb-2">
                  {type === 'internship' ? record.designation : record.projectTitle}
                </h4>
                {type === 'internship' && (
                  <p className="text-lg opacity-90">Internship ID: {record.internNo}</p>
                )}
                {type === 'project' && (
                  <p className="text-lg opacity-90">{record.projectType} • {record.department}</p>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-2 gap-8 mb-8 relative z-10">
              <div className="text-center">
                <div className="bg-white bg-opacity-70 rounded-xl p-4 border border-[#3f6197] border-opacity-20">
                  <Calendar className="w-8 h-8 text-[#3f6197] mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-700 mb-1">Duration</h5>
                  {type === 'internship' ? (
                    <>
                      <p className="text-sm text-gray-600">{formatDate(record.dateOfJoining)} to {formatDate(record.dateOfExpiry)}</p>
                      <p className="text-lg font-bold text-[#3f6197]">{getDuration(record.dateOfJoining, record.dateOfExpiry)}</p>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-[#3f6197]">{record.projectDuration}</p>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-70 rounded-xl p-4 border border-[#3f6197] border-opacity-20">
                  <Verified className="w-8 h-8 text-[#3f6197] mx-auto mb-2" />
                  <h5 className="font-semibold text-gray-700 mb-1">Status</h5>
                  <p className="text-lg font-bold text-green-600">
                    {type === 'internship' ? 'Successfully Completed' : 'Project Completed'}
                  </p>
                </div>
              </div>
            </div>

            {/* Project Specific Details */}
            {type === 'project' && (
              <div className="mb-8 relative z-10">
                <div className="bg-white bg-opacity-70 rounded-xl p-4 border border-[#3f6197] border-opacity-20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <User className="w-6 h-6 text-[#3f6197] mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Project Guide</p>
                      <p className="font-semibold text-gray-800">{record.projectGuideName}</p>
                    </div>
                    <div>
                      <FileText className="w-6 h-6 text-[#3f6197] mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Institute</p>
                      <p className="font-semibold text-gray-800">{record.instituteName}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center relative z-10">
              <div className="flex justify-center items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Awarded in recognition of dedication, hard work, and successful completion
              </p>
              
              <div className="flex justify-between items-end">
                <div className="text-left">
                  <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                  <p className="text-sm text-gray-600">Date of Issue</p>
                  <p className="font-semibold text-gray-800">{formatDate(new Date())}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#3f6197] to-[#5a7db8] rounded-full flex items-center justify-center mb-2">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-xs text-gray-500">Official Seal</p>
                </div>
                
                <div className="text-right">
                  <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                  <p className="text-sm text-gray-600">Authorized Signature</p>
                  <p className="font-semibold text-gray-800">AIC-PECF</p>
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div className="absolute bottom-10 right-10 opacity-10">
              <div className="text-6xl font-bold text-[#3f6197] transform rotate-12">
                AIC-PECF
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Modal>
  );
};

export default CertificateModal;
