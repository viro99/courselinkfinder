
// starting at url https://tch.mcu.edu.tw/sylwebqry/pro_qry.aspx?g_year=113&g_sem=1 and clicking on my program 91 International Business and Trade Program to inject in console to find the right table

function downloadTextFile(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function gatherCourseLinks(courseNumber) {
    // Select all table rows efficiently
    const tableRows = document.querySelectorAll('table#ContentPlaceHolder1_grvShow tr');
    let courseInfo = '';
    let courseTitle = '';
  
    // Find the row containing the course number using a loop
    let foundRow;
    for (const row of tableRows) {
      if (row.textContent.includes(courseNumber)) {
        foundRow = row;
        break; // Exit loop after finding the first match
      }
    }
  
    if (foundRow) {
      // Extract the course title from the second column
      const courseTitleCell = foundRow.children[1];
      if (courseTitleCell) {
        courseTitle = courseTitleCell.textContent.trim();
      }
  
      // Extract links and add them to the courseInfo string
      const englishOutlineLink = foundRow.querySelector('a[href*="type=3"]');
      const activitiesLink = foundRow.querySelector('a[href*="type=5"]');
  
      if (englishOutlineLink) {
        courseInfo += `English Outline: ${englishOutlineLink.href}\n`;
      } else {
        courseInfo += `No "English Outline" link found for course number: ${courseNumber}\n`;
      }
  
      if (activitiesLink) {
        courseInfo += `Activities: ${activitiesLink.href}\n`;
      } else {
        courseInfo += `No "Activities" link found for course number: ${courseNumber}\n`;
      }
    } else {
      courseInfo += `No table row found for course number: ${courseNumber}\n`;
    }
  
    return { courseInfo, courseTitle };
  }
  
  function processCourseNumbers(courseNumbers) {
    courseNumbers.forEach(courseNumber => {
      const { courseInfo, courseTitle } = gatherCourseLinks(courseNumber);
  
      // Create a sanitized file name
      const sanitizedTitle = courseTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const fileName = `CourseInfo_${courseNumber}_${sanitizedTitle}.txt`;
  
      // Trigger download of the text file
      downloadTextFile(courseInfo, fileName);
    });
  }
  
  // Example usage: Replace with your list of course numbers
  const courseNumbers = ['91119', '91130', '91140', '91141', '91142', '99211', '99219', '99236', '99773', '99774', '99785', '27345', '91111', '91112', '91113', '91114', '91117', '91118', '99213', '99214', '99223', '99235', '99237', '99405', '99612', '99759', '99760', '99775', '99780', '99781', '99782', '99783', '99784', '99789', '99991', '99992', '99993', '99994', '99995', '99997', '91122', '91152', '99614', '99778', '99768', '99761', '99762'];
  processCourseNumbers(courseNumbers);
  