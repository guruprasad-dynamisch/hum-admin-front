/**
 * Export Utilities
 * Helper functions for exporting data to various formats
 */

/**
 * Export data to CSV format
 * @param data - Array of objects to export
 * @param filename - Name of the file (without extension)
 * @param headers - Optional custom headers. If not provided, uses object keys
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: string[]
): void {
  if (!data || data.length === 0) {
    console.warn('No data to export')
    return
  }

  // Get headers from first object if not provided
  const csvHeaders = headers || (data[0] ? Object.keys(data[0]) : [])

  // Create CSV rows
  const csvRows = [
    csvHeaders.join(','), // Header row
    ...data.map(row => 
      csvHeaders.map(header => {
        const value = row[header]
        // Handle values with commas or quotes
        if (value === null || value === undefined) return ''
        const stringValue = String(value)
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      }).join(',')
    )
  ]

  const csv = csvRows.join('\n')

  // Create and download file
  downloadFile(csv, `${filename}.csv`, 'text/csv')
}

/**
 * Export data to JSON format
 * @param data - Data to export
 * @param filename - Name of the file (without extension)
 * @param pretty - Whether to format JSON with indentation
 */
export function exportToJSON<T>(
  data: T,
  filename: string,
  pretty: boolean = true
): void {
  const json = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data)
  downloadFile(json, `${filename}.json`, 'application/json')
}

/**
 * Helper function to download a file
 * @param content - File content
 * @param filename - Name of the file
 * @param mimeType - MIME type of the file
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  
  // Clean up
  URL.revokeObjectURL(url)
}