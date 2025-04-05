import React, { useState, useMemo } from "react";

function Tenders() {
  // Added time and updated date format for consistency
  const tenders = [
    {
      id: "092",
      date: "2024-07-26",
      title: "Raspberry Pi 5 Starter Kit for EDM LAB",
      organization: "AICPECF",
      reference: "Proc/AIC-PECF/2024/092",
      lastDate: "2025-08-05",
      lastTime: "17:00",
      fileName: "proc-aicpecf_raspberry_pi_.pdf",
    },
    {
      id: "091",
      date: "2024-05-06",
      title: "Laptop for 3D Scanner, PCB Prototyping and LASER machines",
      organization: "AIC-PECF",
      reference: "Proc/AIC-PECF/2024/091",
      lastDate: "2024-05-17",
      lastTime: "17:00",
      fileName: "proc-aicpecf-2024-091.pdf",
    },
    {
      id: "090",
      date: "2024-05-06",
      title: "7.5KVA/180VDC Online UPS system with Exide Tubular Battery 12V/150AH – 15 nos for FAB LAB Unit",
      organization: "AICPECF",
      reference: "Proc/AIC-PECF/2024/090",
      lastDate: "2024-05-17",
      lastTime: "17:00",
      fileName: "proc-aicpecf-2024-090.pdf",
    },
    {
      id: "057",
      date: "2022-01-01", // Added approximate date
      title: "Desktop Workstation for UAV LAB",
      organization: "AIC-PECF",
      reference: "Proc/AIC-PECF/2022/057",
      lastDate: "2022-05-16",
      lastTime: "17:00",
      fileName: "proc-aicpecf-2022-057.pdf",
    },
    {
      id: "036",
      date: "2020-09-01",
      title: "Design, Development and Supply of Customized Development Boards for Electronic Design & Fab LAB",
      organization: "AIC-PECF",
      reference: "Proc/AIC-PECF/2020/036",
      lastDate: "2020-09-28",
      lastTime: "17:00",
      fileName: "tender_document-2020-036.pdf",
    },
    {
      id: "002-2019",
      date: "2019-01-01", // Added approximate date
      title: "Supply of furniture, false ceiling and electrification in CEO, CFO and Board Room",
      organization: "AIC-PECF",
      reference: "proc/AIC-PECF/2019/002",
      lastDate: "2019-11-16",
      lastTime: "17:00",
      fileName: "call_for_quotation-2019002.pdf",
    },
    {
      id: "001-2019",
      date: "2019-08-09",
      title: "Supply and installation of Modular Furniture",
      organization: "AIC-PECF",
      reference: "e-proc/AIC-PECF/2019/001",
      lastDate: "2019-11-16",
      lastTime: "17:00",
      fileName: "tender_document-2019001.pdf",
    },
  ];

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Auto-determine tender status based on current date
  const processedTenders = useMemo(() => {
    const now = new Date();
    
    return tenders.map(tender => {
      const deadline = new Date(`${tender.lastDate}T${tender.lastTime}`);
      const status = now > deadline ? "closed" : "open";
      
      // Format the dates for display
      const formattedDate = new Date(tender.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      const formattedLastDate = new Date(tender.lastDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      return {
        ...tender,
        status,
        displayDate: formattedDate,
        displayLastDate: formattedLastDate
      };
    });
  }, [tenders]);

  // Filter tenders based on status and search term
  const filteredTenders = useMemo(() => {
    return processedTenders
      .filter(tender => filter === "all" || tender.status === filter)
      .filter(tender => 
        searchTerm === "" || 
        tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [processedTenders, filter, searchTerm]);

  // Count open and closed tenders for the filter buttons
  const counts = useMemo(() => {
    return {
      open: processedTenders.filter(t => t.status === "open").length,
      closed: processedTenders.filter(t => t.status === "closed").length,
      all: processedTenders.length
    };
  }, [processedTenders]);

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Tenders & Procurement</h1>
        <p className="text-blue-100 text-lg">Browse and download our latest tender notices and procurement documents</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "all" 
                  ? "bg-[#3f6197] text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Tenders ({counts.all})
            </button>
            <button 
              onClick={() => setFilter("open")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                filter === "open" 
                  ? "bg-green-600 text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${filter === "open" ? "bg-white" : "bg-green-500"} mr-2`}></span>
              Open Tenders ({counts.open})
            </button>
            <button 
              onClick={() => setFilter("closed")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                filter === "closed" 
                  ? "bg-red-600 text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${filter === "closed" ? "bg-white" : "bg-red-500"} mr-2`}></span>
              Closed Tenders ({counts.closed})
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:border-transparent"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Showing {filteredTenders.length} tender{filteredTenders.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filteredTenders.length === 0 ? (
        <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 text-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-yellow-800 text-lg font-medium">No tenders available matching your criteria.</p>
          <p className="text-yellow-700 mt-2">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTenders.map((tender) => (
            <div
              key={tender.id}
              className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-all hover:shadow-xl"
            >
              <div className={`px-6 py-5 border-b ${
                tender.status === "open" 
                  ? "bg-gradient-to-r from-[#3f6197]/95 to-[#5478b0]/95" 
                  : "bg-gradient-to-r from-gray-700/95 to-gray-600/95"
              }`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-100 text-sm">{tender.displayDate}</span>
                      <span className="text-blue-100">•</span>
                      <span className="text-blue-100 text-sm">{tender.reference}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{tender.title}</h2>
                  </div>
                  <div className="md:flex-shrink-0">
                    {tender.status === "open" ? (
                      <span className="bg-green-500 text-white font-medium px-4 py-1.5 rounded-full text-sm flex items-center justify-center w-24">
                        <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                        OPEN
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white font-medium px-4 py-1.5 rounded-full text-sm flex items-center justify-center w-24">
                        <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                        CLOSED
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="mb-2">
                        <span className="text-gray-500 text-sm">Organization</span>
                        <br />
                        <span className="font-medium text-gray-800">{tender.organization}</span>
                      </p>
                    </div>
                    <div>
                      <p className="mb-2">
                        <span className="text-gray-500 text-sm">Last Date for Submission</span>
                        <br />
                        <span className={`font-medium ${tender.status === "open" ? "text-red-600" : "text-gray-800"}`}>
                          {tender.displayLastDate} at {tender.lastTime.replace(':', '.')}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
                    <a
                      href={`/uploads/9/8/0/9/9809129/${tender.fileName}`}
                      className="flex items-center p-4 bg-[#3f6197]/10 rounded-lg hover:bg-[#3f6197]/20 transition-colors gap-3 group"
                    >
                      <div className="p-2 bg-[#3f6197] rounded-lg text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#3f6197] font-semibold group-hover:text-[#2c4b79]">Tender Document</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{tender.fileName}</p>
                      </div>
                      <div className="ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-[#3f6197]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </div>
                    </a>
                    
      
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tenders;