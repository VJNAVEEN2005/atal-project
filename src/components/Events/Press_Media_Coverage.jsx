import React, { useState } from 'react';

const Press_Media_Coverage = () => {
  // Media coverage data with images, text, source, date and categories
  const mediaCoverage = [
    {
      id: 1,
      title: "AIC-PECF Launches New Incubation Program for Tech Startups",
      image: "/uploads/9/8/0/9/9809129/aic_incubation_program.jpg",
      summary: "AIC-PECF has launched a new incubation program aimed at supporting early-stage technology startups in the region. The program offers mentorship, funding opportunities, and access to state-of-the-art facilities.",
      content: "The Atal Incubation Centre at PEC Foundation (AIC-PECF) has announced the launch of its flagship incubation program targeted at early-stage technology startups. The six-month program will provide selected startups with up to ₹10 lakhs in seed funding,24.",
      source: "The Economic Times",
      sourceLink: "https://economictimes.com/article/aic-pecf-program",
      date: "2024-04-01",
      category: "Programs"
    },
    {
      id: 2,
      title: "Local Startup Secures ₹2 Crore Funding After AIC-PECF Demo Day",
      image: "/uploads/9/8/0/9/9809129/startup_funding_success.jpg",
      summary: "EcoSense Technologies, an IoT startup incubated at AIC-PECF, has secured ₹2 crore in pre-Series A funding following their pitch at the center's annual Demo Day event.",
      content: "EcoSense Technologies, a promising startup focused on IoT solutions for environmental monitoring, has successfully raised ₹2 crore in pre-Series A funding. The funding round was led by GreenTech Ventures, with participation from several angel inve.\"",
      source: "Business Standard",
      sourceLink: "https://business-standard.com/article/ecosense-funding",
      date: "2024-03-15",
      category: "Success Stories"
    },
    {
      id: 3,
      title: "AIC-PECF Partners with Industry Leaders for Advanced Manufacturing Lab",
      image: "/uploads/9/8/0/9/9809129/manufacturing_lab_launch.jpg",
      summary: "AIC-PECF has partnered with Siemens and Bosch to establish a state-of-the-art Advanced Manufacturing Lab that will serve both incubated startups and industry partners.",
      content: "In a significant development for the regional startup ecosystem, the Atal Incubation Centre at PEC Foundation (AIC-PECF) has announced a strategic partnership with industry giants Siemens and Bosch to establish an Advanced Manufacturing Lab. totypes.\"",
      source: "The Hindu",
      sourceLink: "https://thehindu.com/article/aic-pecf-manufacturing-lab",
      date: "2024-02-20",
      category: "Partnerships"
    },
    {
      id: 4,
      title: "AIC-PECF Hosts National Conference on Deep Tech Innovation",
      image: "/uploads/9/8/0/9/9809129/deep_tech_conference.jpg",
      summary: "Over 500 participants attended the National Conference on Deep Tech Innovation organized by AIC-PECF, featuring keynote speeches from industry leaders and government officials.",
      content: "The Atal Incubation Centre at PEC Foundation recently hosted the National Conference on Deep Tech Innovation, drawing over 500 participants from across the country. The two-day event featured keynote speeches, panel discussions, and workshops ces.\"",
      source: "India Today",
      sourceLink: "https://indiatoday.in/article/deep-tech-conference",
      date: "2024-02-05",
      category: "Events"
    },
    {
      id: 5,
      title: "AIC-PECF Startups Generate 200+ Jobs in Local Economy",
      image: "/uploads/9/8/0/9/9809129/startup_job_creation.jpg",
      summary: "A recent impact assessment report reveals that startups incubated at AIC-PECF have created over 200 direct jobs in the region over the past year.",
      content: "Startups incubated at the Atal Incubation Centre at PEC Foundation (AIC-PECF) have collectively created over 200 direct jobs in the local economy during the past financial year, according to a recent impact assessment report. The report, prepas.\"",
      source: "Financial Express",
      sourceLink: "https://financialexpress.com/article/aic-pecf-job-creation",
      date: "2024-01-18",
      category: "Impact"
    }
  ];

  // Filter and sort states
  const [activeSource, setActiveSource] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique sources for filter
  const sources = ['All', ...new Set(mediaCoverage.map(item => item.source))];

  // Filter media items based on active source and search term
  const filteredMedia = mediaCoverage
    .filter(item => {
      const matchesSource = activeSource === 'All' || item.source === activeSource;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.summary.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSource && (searchTerm === '' || matchesSearch);
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Press & Media Coverage</h1>
        <p className="text-blue-100 text-lg">News, articles, and media mentions featuring our incubation center and startups</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Source</label>
            <select
              value={activeSource}
              onChange={(e) => setActiveSource(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
            >
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by Date</label>
            <div className="flex">
              <button
                onClick={() => setSortOrder('newest')}
                className={`flex-1 px-4 py-2 rounded-l-lg font-medium transition-all ${
                  sortOrder === 'newest'
                    ? "bg-[#3f6197] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => setSortOrder('oldest')}
                className={`flex-1 px-4 py-2 rounded-r-lg font-medium transition-all ${
                  sortOrder === 'oldest'
                    ? "bg-[#3f6197] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {activeSource !== 'All' && (
          <div className="bg-blue-50 text-[#3f6197] px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span>Source: {activeSource}</span>
            <button 
              onClick={() => setActiveSource('All')} 
              className="ml-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {searchTerm && (
          <div className="bg-blue-50 text-[#3f6197] px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span>Search: "{searchTerm}"</span>
            <button 
              onClick={() => setSearchTerm('')} 
              className="ml-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Media Coverage Cards */}
      <div className="space-y-8">
        {filteredMedia.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="md:flex">
              {/* Image section */}
              <div className="md:w-1/3 h-64 md:h-auto">
                <div className="h-full w-full bg-gray-200 relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/uploads/9/8/0/9/9809129/placeholder.jpg";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#3f6197] text-white text-xs font-medium px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Content section */}
              <div className="md:w-2/3 p-6">
                <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
                  <time dateTime={item.date}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span>•</span>
                  <a 
                    href={item.sourceLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#3f6197] hover:underline font-medium"
                  >
                    {item.source}
                  </a>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.summary}</p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                  <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Source:</span>
                    <a 
                      href={item.sourceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#3f6197] hover:underline flex items-center gap-1"
                    >
                      <span>{item.source}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  
                  <button className="text-[#3f6197] hover:text-[#2c4b79] flex items-center gap-1">
                    <span>Share</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state if no media items match the filter */}
      {filteredMedia.length === 0 && (
        <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 text-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-yellow-800 text-lg font-medium">No media coverage found matching your criteria.</p>
          <p className="text-yellow-700 mt-2">Try adjusting your filters or search term.</p>
        </div>
      )}
      
      {/* Results count */}
      {filteredMedia.length > 0 && (
        <div className="mt-6 text-center text-gray-500">
          Showing {filteredMedia.length} of {mediaCoverage.length} articles
        </div>
      )}
    </div>
  );
};

export default Press_Media_Coverage;