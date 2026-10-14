export const courses = [
  {
    code: 'PRF192',
    name: 'Programming Fundamentals',
    credits: 3,
    semester: 'Fall',
    desc: 'Nền tảng tư duy lập trình, thuật toán và kỹ năng giải quyết vấn đề bằng ngôn ngữ lập trình.',
  },
  {
    code: 'WED201c',
    name: 'Web Design',
    credits: 3,
    semester: 'Spring',
    desc: 'Kiến thức nền tảng về HTML, CSS và thiết kế giao diện web thân thiện với người dùng.',
  },
  {
    code: 'PRO192',
    name: 'Object-Oriented Programming',
    credits: 3,
    semester: 'Summer',
    desc: 'Các nguyên lý lập trình hướng đối tượng, lớp, đối tượng, kế thừa và đa hình.',
  },
  {
    code: 'FER202',
    name: 'Front-End Frameworks',
    credits: 3,
    semester: 'Fall',
    desc: 'Xây dựng giao diện web hiện đại bằng React, component, state và định tuyến phía client.',
  },
  {
    code: 'SWP391',
    name: 'Software Project',
    credits: 5,
    semester: 'Spring',
    desc: 'Vận dụng quy trình phát triển phần mềm để phân tích, xây dựng và kiểm thử một dự án nhóm.',
  },
]

export const findCourse = (code) =>
  courses.find((course) => course.code.toLowerCase() === code.toLowerCase())
