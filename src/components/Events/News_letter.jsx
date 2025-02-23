import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, BookOpen, Download } from "lucide-react"
import HTMLFlipBook from "react-pageflip"
import { newsletterimg } from "../../assets/Events/News_Letter/data"
import jsPDF from "jspdf"

const NewsLetter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
  const images = newsletterimg
  const bookRef = useRef(null)

  const isMobile = windowWidth < 768

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Responsive dimensions
  const getBookDimensions = () => {
    if (windowWidth < 640) return { width: 300, height: 420 }
    if (windowWidth < 768) return { width: 320, height: 448 }
    if (windowWidth < 1024) return { width: 360, height: 504 }
    return { width: 400, height: 560 }
  }

  const dimensions = getBookDimensions()

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext()
    }
  }

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev()
    }
  }

  const downloadPDF = async () => {
    const pdf = new jsPDF()

    for (let i = 0; i < images.length; i++) {
      const img = new Image()
      img.src = images[i]
      await new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0, img.width, img.height)
          const imgData = canvas.toDataURL("image/jpeg", 1.0)

          if (i !== 0) {
            pdf.addPage()
          }
          pdf.addImage(imgData, "JPEG", 0, 0, 210, 297) // A4 size
          resolve()
        }
      })
    }

    pdf.save("newsletter.pdf")
  }

  const Page = React.forwardRef(({ image }, ref) => {
    return (
      <div ref={ref} className="bg-white shadow-2xl overflow-hidden">
        <img src={image || "/placeholder.svg"} alt="Newsletter page" className="w-full h-full object-cover" />
      </div>
    )
  })

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-6 md:py-12 px-4">
      {/* Header */}
      <motion.div
        className="w-full max-w-4xl text-center mb-8 md:mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-2xl md:text-4xl font-bold mb-2"
          style={{ color: "#3f6197" }}
          whileHover={{ scale: 1.05 }}
        >
          NEWS LETTERS
        </motion.h2>
        <motion.h1 className="text-4xl md:text-6xl font-bold mb-4" whileHover={{ scale: 1.02 }}>
          Don't Miss Out
        </motion.h1>
        <motion.p
          className="text-base md:text-xl text-gray-600 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Stay connected and informed with the latest happenings in the startup ecosystem
        </motion.p>
      </motion.div>

      {/* Book Cover */}
      {!isOpen && (
        <motion.div
          className="cursor-pointer transform-gpu"
          whileHover={{ scale: 1.05, rotateY: 15 }}
          onClick={() => setIsOpen(true)}
        >
          <div
            className="bg-[#3f6197] rounded-lg shadow-2xl flex items-center justify-center"
            style={{
              width: isMobile ? dimensions.width : dimensions.width * 2,
              height: dimensions.height,
              perspective: "1000px",
            }}
          >
            <motion.div
              className="text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <BookOpen size={windowWidth < 768 ? 60 : 80} className="mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-2">AIC PECF Newsletter</h2>
              <p className="text-base md:text-lg">Click to Open</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Flipbook Container */}
      {isOpen && (
        <div className="relative flex justify-center items-center w-full">
          <motion.button
            onClick={prevPage}
            className="absolute left-2 md:left-4 z-10 p-2 md:p-4 rounded-full bg-white shadow-lg hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={windowWidth < 768 ? 20 : 24} />
          </motion.button>

          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            size="stretch"
            minWidth={300}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            ref={bookRef}
          >
            {images.map((image, index) => (
              <Page key={index} image={image} />
            ))}
          </HTMLFlipBook>

          <motion.button
            onClick={nextPage}
            className="absolute right-2 md:right-4 z-10 p-2 md:p-4 rounded-full bg-white shadow-lg hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={windowWidth < 768 ? 20 : 24} />
          </motion.button>
        </div>
      )}

      {/* Page Counter, Close Button, and Download Button */}
      <div className="flex flex-col items-center mt-4 md:mt-6 space-y-4">
        {isOpen && (
          <>
            <motion.button
              className="px-4 md:px-6 py-2 bg-[#3f6197] text-white rounded-full shadow-lg text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
            >
              Close Book
            </motion.button>
            <motion.button
              className="px-4 md:px-6 py-2 bg-green-600 text-white rounded-full shadow-lg text-sm md:text-base flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadPDF}
            >
              <Download size={16} className="mr-2" />
              Download PDF
            </motion.button>
          </>
        )}
      </div>
    </div>
  )
}

export default NewsLetter

