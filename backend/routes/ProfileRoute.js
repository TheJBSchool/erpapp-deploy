const express = require('express');
const router = express.Router();
const Student = require("../src/models/studentProfile");
const Admin = require('../src/models/adminProfile');
const Teacher = require("../src/models/teacherProfile");
const Counter = require("../src/models/counterModel");
const Staff = require("../src/models/staffProfile");
const Fee = require("../src/models/fee");
const auth = require('../src/middlewares/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Timetable = require('../src/models/timeTable');
const multer = require('multer');
const LostItem = require('../src/models/lostItem');
const Circular = require('../src/models/circular');
const Otp = require('../src/models/otp');
const Subject = require('../src/models/subjects');
const ExamType = require('../src/models/examTypes');
const Result = require('../src/models/result');
const ResultReq = require('../src/models/resultReq');
const FeeReceipt = require('../src/models/feeReceipt');
const FeeReq = require('../src/models/feeReq');
const path = require('path');
const nodemailer = require("nodemailer");

router.post('/login', async (req, res) => {
    try {
        const { username, password, selectedType } = req.body;
        let admin_data, teacher_data, student_data, pass, token;
        switch (selectedType) {
            case "Admin":
                admin_data = await Admin.findOne({ ID: username });
                if (!admin_data) return res.status(401).json({ message: "Invalid Credentials", status: 401 });
                pass = admin_data.password == password;
                if (!pass) return res.status(401).json({ message: "Invalid Credentials", status: 401 });
                token = jwt.sign({ _id: admin_data._id }, process.env.S_KEY, { expiresIn: "30d" });
                res.status(201).json({ admin_data,token, status: 201 });
                break;
            case "Teacher":
                teacher_data = await Teacher.findOne({ ID: username });
                if (!teacher_data) return res.status(401).json({ message: "Invalid Credentials", status: 401 });
                pass = await bcrypt.compare(password, teacher_data.password);
                if (!pass) return res.status(401).json({ message: "Invalid Credentials", status: 401 });
                token = jwt.sign({ _id: teacher_data._id }, process.env.S_KEY, { expiresIn: "30d" });
                res.status(201).json({ teacher_data,token, status: 201 });
                break;
            case "Student":
                student_data = await Student.findOne({ ID: username });
                if (!student_data) return res.status(401).json({ message: "Invalid Credentials", status: 401 });
                pass = await bcrypt.compare(password, student_data.password);
                if (!pass) return res.status(401).json({ message: "Invalid Credentials", status: 401 });
                token = jwt.sign({ _id: student_data._id }, process.env.S_KEY, { expiresIn: "30d" });
                res.status(201).json({ student_data,token, status: 201 });
                break;
        }
    } catch (e) {
        res.json({ "error": e.message });
    }
})

//register new student
router.post('/manageStudent', async (req, res) => {
    try {
        const new_student = new Student(req.body);
        new_student.password = await bcrypt.hash(new_student.password, 10);
        const resp = await new_student.save();
        return res.status(201).json({ resp, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

//register new teacher
router.post('/manageTeacher', async (req, res) => {
    try {
        const new_teacher = new Teacher(req.body);
        new_teacher.password = await bcrypt.hash(new_teacher.password, 10);
        const resp = await new_teacher.save();
        return res.status(201).json({ resp, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

//register new teacher
router.post('/manageAdmin', async (req, res) => {
    try {
      const new_admin = new Admin(req.body);
      // new_admin.password = await bcrypt.hash(new_admin.password, 10);
      const resp = await new_admin.save();
      const all_admins = await Admin.find();
      return res.status(201).json({ all_admins, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/admins', async (req, res) => {
    try {
        const all_admins = await Admin.find();
        return res.status(201).json({ all_admins, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;
    try {
        const all_teachers = await Teacher.find({underBy: teacherId});
        return res.status(201).json({ all_teachers, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/students/:id', async (req, res) => {
  const adminId = req.params.id;
    try {
        const all_students = await Student.find({underBy:adminId});
        return res.status(201).json({ all_students, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.patch('/studentUpdate/:id', async (req, res) => {
    try {
        const stu_id = req.params.id;
        const dataToUpdate = req.body;
        const updateStu = await Student.updateOne({_id:stu_id},dataToUpdate);
        if (updateStu.nModified === 0) {
            return res.status(404).json({ error: "Student not updated" });
        }
        const all_students = await Student.find();
        return res.status(201).json({ all_students, status: 201 });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

router.patch('/teacherUpdate/:id', async (req, res) => {
    try {
        const t_id = req.params.id;
        const dataToUpdate = req.body;
        const updateT = await Teacher.updateOne({_id:t_id},dataToUpdate);
        if (updateT.nModified === 0) {
            return res.status(404).json({ error: "Teacher not updated" });
        }
        const all_teachers = await Teacher.find();
        return res.status(201).json({ all_teachers, status: 201 });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})
router.patch('/adminUpdate/:id', async (req, res) => {
    try {
        const a_id = req.params.id;
        const dataToUpdate = req.body;
        const updatedA = await Admin.updateOne({_id:a_id},dataToUpdate);
        if (updatedA.nModified === 0) {
            return res.status(404).json({ error: "Admin not updated" });
        }
        const all_admins = await Admin.find();
        return res.status(201).json({ all_admins, status: 201 });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

router.delete('/studentDelete/:id', async (req, res) => {
    try {
        const stu_id = req.params.id;
        const deleteStu = await Student.deleteOne({_id:stu_id});
        if (!deleteStu) {
            return res.status(404).json({ error: "Student couldn't deleted" });
        }
        const all_students = await Student.find();
        // console.log(all_students);
        return res.status(201).json({ all_students, status: 201 });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
})

router.delete('/teacherDelete/:id', async (req, res) => {
    try {
        const t_id = req.params.id;
        const deleteT = await Teacher.deleteOne({_id:t_id});
        if (!deleteT) {
            return res.status(404).json({ error: "Teacher couldn't deleted" });
        }
        const all_teachers = await Teacher.find();
        return res.status(201).json({ all_teachers, status: 201 });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

router.delete('/adminDelete/:id', async (req, res) => {
    try {
        const a_id = req.params.id;
        const deleteA = await Admin.deleteOne({_id:a_id});
        if (!deleteA) {
            return res.status(404).json({ error: "Admin couldn't deleted" });
        }
        const all_admins = await Admin.find();
        return res.status(201).json({ all_admins, status: 201 });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

router.get('/searchStudents/:id', async (req, res) => {
  const adminId = req.params.id;
  try { 
      // console.log(req.query);
    const {group, classes , section} = req.query;

    const filtered_students = await Student.find({underBy:adminId, group, class: classes, section});
    if(!filtered_students){
        return res.status(404).send('Search request failed');
    }
    return res.status(200).json({ filtered_students, status: 200 });
  } catch (e) {
      return res.json({ "error": e.message });
  }
})
router.get('/searchTeachers/:id', async (req, res) => {
  const adminId = req.params.id;
    try { 
        console.log(req.query);
        const {group, classes , section} = req.query;
        const filtered_teachers = await Teacher.find({underBy:adminId, group:group, class: classes, section:section});
        console.log("filtered_teacher",filtered_teachers)
        if(!filtered_teachers){
            return res.status(404).send('Search request failed');
        }
        return res.status(200).json({ filtered_teachers, status: 200 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

const getStartingQuarter = (admissionDate)=>{
  const date = new Date(admissionDate);

    const month = date.getMonth(); // 0 for January, 1 for February, ..., 11 for December

    // Define quarters based on months
    if (month >= 0 && month <= 2) {
        // Quater4: January, February, March
        return 'Quater4';
    } else if (month >= 3 && month <= 5) {
        // Quater1: April, May, June
        return 'Quater1';
    } else if (month >= 6 && month <= 8) {
        // Quater2: July, August, September
        return 'Quater2';
    } else {
        // Quater3: October, November, December
        return 'Quater3';
    }
}
router.post('/setFeeStudent/:adminId', async (req, res) => {
    const adminId = req.params.adminId;
    try {
        const resp = await Fee.findOneAndUpdate(
            { underBy: adminId, session: req.body.session, class: req.body.class },
            req.body,
            { upsert: true, new: true }
        );

        const students = await Student.find({ underBy: adminId, session: req.body.session, class: req.body.class });

        for (const student of students) {
            const quarterToUpdate = getStartingQuarter(student.admission_date);

            if (!student.feePayments) {
                student.feePayments = {}; // Initialize if absent
            }

            // Ensure the feePayments object for the determined quarter exists or initialize it
            if (!student.feePayments[quarterToUpdate]) {
                student.feePayments[quarterToUpdate] = {}; // Initialize if absent for the specific quarter
            }

            student.feePayments[quarterToUpdate].adm_fee = req.body.adm_fee.toString();

            const academicFeePerQuarter = parseFloat(req.body.academic_fee) / 4;

            // Update acdm_fee for all quarters
            for (const quarter in student.feePayments) {
                if (Object.hasOwnProperty.call(student.feePayments, quarter)) {
                    student.feePayments[quarter].acdm_fee = academicFeePerQuarter.toString();
                    student.feePayments[quarter].pending_fee = 0;
                    student.feePayments[quarter].late_fee = 0;
                    student.feePayments[quarter].fee_applied = false;
                }
            }

            const quarters = Object.keys(student.feePayments);
            const indexToUpdate = quarters.indexOf(quarterToUpdate);
            // Check if the quarter to update exists and update fee_applied for subsequent quarters
            if (indexToUpdate !== -1) {
                quarters.slice(indexToUpdate).forEach((quarter) => {
                    if (!student.feePayments[quarter]) {
                        student.feePayments[quarter] = {}; // Initialize if absent for the specific quarter
                    }
                    student.feePayments[quarter].fee_applied = true;
                });
            }

            try {
                await student.save();
            } catch (saveErr) {
                console.error(`Error saving student ${student._id}: ${saveErr}`);
            }
        }

        return res.status(201).json({ resp, status: 201 });
    } catch (e) {
        return res.json({ error: e.message });
    }
});

router.post('/setFeeForStudent', async (req, res) => {
    const {adminId,sId, session, stuClass} = req.body;
    try {
        const feeData = await Fee.find({ underBy: adminId, session:session, class: stuClass });

        const student = await Student.find({_id: sId });

        const quarterToUpdate = getStartingQuarter(student.admission_date);

        if (!student.feePayments) {
            student.feePayments = {}; // Initialize if absent
        }

        // Ensure the feePayments object for the determined quarter exists or initialize it
        if (!student.feePayments[quarterToUpdate]) {
            student.feePayments[quarterToUpdate] = {}; // Initialize if absent for the specific quarter
        }

        student.feePayments[quarterToUpdate].adm_fee = feeData.adm_fee.toString();

        const academicFeePerQuarter = parseFloat(feeData.academic_fee) / 4;

        // Update acdm_fee for all quarters
        for (const quarter in student.feePayments) {
            if (Object.hasOwnProperty.call(student.feePayments, quarter)) {
                student.feePayments[quarter].acdm_fee = academicFeePerQuarter.toString();
                student.feePayments[quarter].pending_fee = 0;
                student.feePayments[quarter].late_fee = 0;
                student.feePayments[quarter].fee_applied = false;
            }
        }

        const quarters = Object.keys(student.feePayments);
        const indexToUpdate = quarters.indexOf(quarterToUpdate);
        // Check if the quarter to update exists and update fee_applied for subsequent quarters
        if (indexToUpdate !== -1) {
            quarters.slice(indexToUpdate).forEach((quarter) => {
                if (!student.feePayments[quarter]) {
                    student.feePayments[quarter] = {}; // Initialize if absent for the specific quarter
                }
                student.feePayments[quarter].fee_applied = true;
            });
        }

        try {
            await student.save();
        } catch (saveErr) {
            console.error(`Error saving student ${student._id}: ${saveErr}`);
        }
    

        return res.status(201).json({ resp, status: 201 });
    } catch (e) {
        return res.json({ error: e.message });
    }
});




router.post('/UpdateStuFee/:sid/:quater', async (req, res) => {
  try {
    const { sid, quater } = req.params;
    const QuaterData = req.body;

    // Find the student by ID
    const student = await Student.findById(sid);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the provided quarter exists in the student's feePayments
    if (!student.feePayments || !student.feePayments[quater]) {
      return res.status(404).json({ message: 'Quarter data not found for the student' });
    }

    // Update the quarter data
    const quarterToUpdate = student.feePayments[quater];
    for (const key in QuaterData) {
      if (Object.hasOwnProperty.call(QuaterData, key)) {
        if (quarterToUpdate.hasOwnProperty(key)) {
          quarterToUpdate[key] = QuaterData[key];
        }
      }
    }

    await student.save();

    // Fetch the updated student with the updated quarter data
    const updatedStudent = await Student.findById(sid);

    res.status(200).json({ message: `${quater} payment done successfully`, student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/getStudent', async (req, res) => {
    try {
        let curr_Class = req.query.class;
        let section = req.query.section;
        let session = req.query.session;
        let adminId = req.query.adminId;

        const data = await Student.find({underBy: adminId, class: curr_Class, section, session});
        return res.status(201).json({ data, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/getFeeDetails', async (req, res) => {
    try {
        let curr_Class = req.query.class;
        let session = req.query.session;
        let adminId = req.query.adminId;
        const data = await Fee.find({underBy: adminId, class: curr_Class, session:session});
        return res.status(201).json(data);
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/retrieve/:adminId', async (req, res) => {
    const {adminId} = req.params;
    try {
        const counter = await Counter.findOne({underBy:adminId, name: 'invoiceCount' });
        if (counter) {
            res.status(200).json({ invoiceNumber: counter.count });
        } else {
            res.status(404).json({ error: 'Invoice counter not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving the invoice number' });
    }
});

router.post('/updatereceiptno/:adminId',  async (req, res) => {
  const adminId = req.params.adminId;
  console.log("updatereceiptno Amdin",adminId)
    try {
        const updatedCounter = await Counter.findOneAndUpdate(
            { name: 'invoiceCount', underBy:adminId },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );

        const newInvoiceNumber = updatedCounter.count;
        res.status(200).json({ invoiceNumber: newInvoiceNumber });
    } catch (err) {
        res.status(500).json({ error: 'Error generating the invoice' });
    }
})

router.post('/registerStaff', async (req, res) => {
    try {
        const new_staff_data = new Staff(req.body);
        const resp = await new_staff_data.save();
        return res.status(201).json({resp, status: 201});
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/getStaff/:adminId', async (req, res) => {

  const adminId = req.params.adminId;

  try {
    const totalStaff = await Staff.find({underBy: adminId});
    res.status(200).json(totalStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


router.post('/timetable/:adminId/:classValue', async (req, res) => {
  const { classValue, adminId } = req.params;
  const timetableData = req.body;

  try {
    let existingTimetable = await Timetable.findOne({underBy: adminId, class: classValue });

    if (existingTimetable) {
      existingTimetable.table = timetableData;
      await existingTimetable.save();
      res.json(existingTimetable);
    } else {
      const newTimetable = new Timetable({
        class: classValue,
        table: timetableData,
        underBy: adminId
      });
      const savedTimetable = await newTimetable.save();
      res.json(savedTimetable);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/timetable/:adminId/:classValue', async (req, res) => {
  const { classValue, adminId } = req.params;

  try {
    const timetable = await Timetable.findOne({underBy: adminId, class: classValue });
    res.json(timetable ? timetable.table : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//teacher name should be unique
router.get('/teachertimetable/:adminId/:teacher', async (req, res) => {
  const teacherName = req.params.teacher;
  const adminId = req.params.adminId;
  try {
    const timetables = await Timetable.find({underBy:adminId}); // Retrieve all timetables of particular admin
    const teacherTimetables = [];

    if (timetables && timetables.length > 0) {
      timetables.forEach((timetable) => {
        const filteredTable = timetable.table.flat().filter(classData => {
          return classData.teacher === teacherName;
        });

        if (filteredTable.length > 0) {
          const teacherClasses = filteredTable.map(classData => ({
            time: classData.startTime,
            subject: classData.subject,
            class: timetable.class,
            days: classData.day// Assuming these days are static for all classes
          }));
          teacherTimetables.push(...teacherClasses);
        }
      });
    }

    return res.status(201).json(teacherTimetables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//lost and found
const storage = multer.diskStorage({
  destination: 'lostAndFound/', // specify the folder where files will be stored
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
router.post('/lostFound', upload.single('itemImg'), async (req, res) => {
  try {
    const { itemDesc, claimBy } = req.body;
    const imageUrl = req.file.path;
    const newItem = new LostItem({
      itemImg: req.file.filename,
      imageUrl,
      itemDesc,
      claimBy,
    });

    await newItem.save();

    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/recentLostItem/:adminId', async (req, res) => {
  const adminId = req.params.adminId;
  try {
    const recentItems = await LostItem.find({underBy: adminId}).sort({ _id: -1 }); // Adjust the limit as needed
    res.status(201).json(recentItems);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/claimitem/:adminId', async (req, res) => {
  const adminId = req.params.adminId;
  try {
    const { itemId, claimBy } = req.body;

    // Find the lost item by ID
    const lostItem = await LostItem.find({underBy: adminId, _id:itemId});

    if (!lostItem) {
      return res.status(404).json({ message: 'Lost item not found' });
    }

    // Check if the student has already claimed the item
    const existingClaim = lostItem.claimBy.find(claim => claim.student.ID.toString() === claimBy.student.ID.toString());

    if (existingClaim) {
      return res.status(400).json({ message: 'Student has already claimed this item' });
    }

    // Add the new claim to the array
    lostItem.claimBy.push({ student: claimBy.student, claimMessage: claimBy.claimMessage });

    // Save the updated item
    await lostItem.save();

    res.status(200).json({ message: 'Item claimed successfully' });
  } catch (error) {
    console.error('Backend Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/createcircular', async(req,res) =>{
    try {
        // console.log("backend",req.body);
        const new_circular = new Circular(req.body);
        const resp = await new_circular.save();
        return res.status(201).json({resp, status: 201});
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/allcirculars/:adminId', async (req, res) => {
  const adminId = req.params.adminId;
    try {
        const circulars = await Circular.find({underBy:adminId});
        return res.status(201).json({ circulars, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})


router.patch('/editCircular/:id', async (req, res) => {
    try {
        const circular_id = req.params.id;
        const dataToUpdate = req.body;
        const updateCircular = await Circular.updateOne({_id:circular_id},dataToUpdate);
        // console.log("updatedCircular",updateCircular);
        if (updateCircular.nModified === 0) {
            return res.status(404).json({ error: "Student not updated" });
        }
        const circulars = await Circular.find();
        return res.status(201).json({ circulars, status: 201 });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

router.delete('/deleteCircular/:id', async (req, res) => {
    try {
        const circular_id = req.params.id;
        const deleteCircular = await Circular.deleteOne({_id:circular_id});
        if (!deleteCircular) {
            return res.status(404).json({ error: "Student couldn't deleted" });
        }
        const circulars = await Circular.find();
        return res.status(200).json({ circulars, status: 200 });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
})

function classCategory(Student_class) {
    if (['Pre-Nursery', 'Nursery', 'LKG', 'UKG'].includes(Student_class)) {
        return "Pre-School";
    } else if (['1', '2', '3', '4', '5'].includes(Student_class)) {
        return "Primary-School";
    } else if (['6', '7', '8', '9', '10'].includes(Student_class)) {
        return "Secondary-School";
    } 
}

router.get('/stucircular/:adminId/:classes', async (req, res) => {
    try {
        const stu_class = req.params.classes;
        const adminId = req.params.adminId;
        let category = classCategory(stu_class);
        const circulars = await Circular.find({underBy: adminId, $or: [{target: stu_class}, {target:category}, {target:'All'}]});
        return res.status(201).json(circulars);
    } catch (e) {
        return res.json({ "error": e.message });
    }
})


const sendResetEmail = async (recipientEmail, Otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Example: 'gmail'
    port: 587,
    secure: false,
    auth: {
      user: process.env.ADMINSTRATION_EMAIL, // Your email address
      pass: process.env.ADMINSTRATION_PSW, // Your email password
    },
  });
                        
  // Construct the email message
  const mailOptions = {
    from: process.env.ADMINSTRATION_EMAIL,
    to: recipientEmail,
    subject: 'Password Reset',
    html: `
      <p>You have requested a password reset.</p>
      <p>This is the OTP: ${Otp}</p>
    `,
  };
      // <p>You have requested a password reset.</p>
    //   <p>Click <a href="http://yourapp.com/reset?token=${resetToken}">here</a> to reset your password.</p>

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent: ' + info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    // console.error('Error sending email: ', error);
    return { success: false, message: 'Failed to send email' };
  }
};

router.post('/emailsend', async (req, res)=>{
  const {email} = req.body ;
  // console.log("req.body",req.body);
  let data = await Admin.findOne({email})
  // console.log("data",data);

  const responseType = {};
  if(data){
    let optcode = Math.floor(Math.random()*10000+1);
    let optData = new Otp({
      email: email,
      code : optcode,
    })
    let otpResponse = await optData.save();
    sendResetEmail(email,optcode);
    responseType.statusText = 'Success';
    responseType.message = "Please Check your email"
  }else{
    responseType.statusText = 'Error';
    responseType.message = "Email is not Exist"
  }
  res.status(200).json(responseType)
})

router.post('/validateopt', async (req, res)=>{
  const {email, otp} = req.body ;
  // console.log(req.body);
  let data = await Otp.findOne({email,code:otp})
  let responseType;
  if(data){
    responseType=true;
  }else{
    responseType=false;
  }
  res.status(200).json(responseType)
})

router.patch('/resetpassword', async (req, res)=>{
  const {email, newpsw} = req.body ;
  let dataToUpdate= {
    password: newpsw
  }
  let data = await Admin.updateOne({email},dataToUpdate)
  if(data){
    responseType=true;
  }else{
    responseType=false;
  }
  res.status(200).json(responseType)
})


router.patch("/uploadLogo/:id", async (req, res) => {
  const {school_logo} = req.body;
  const admin_id = req.params.id;
  try{
      const newImage = await Admin.updateOne({_id:admin_id},{school_logo});
      if (newImage.nModified === 0) {
          return res.status(404).json({ error: "Student not updated" });
      }
      res.status(201).json({ message : "New image uploaded...!"})
  }catch(error){
      res.status(409).json({ message : error.message })
  }
})

router.patch('/title/:id',async (req, res) => {
  const {title} = req.body;
  const admin_id = req.params.id;
  // console.log(title)
  const data = await Admin.findOneAndUpdate({_id:admin_id}, { school_name: title }, { upsert: true })
  if (data.nModified === 0) {
    return res.status(404).json({ message: "Title not updated" });
  }
  return res.status(200).json({ message: "Title updated successfully" });
    
});

router.get('/settings/:id',async (req, res) => {
  try{

  const admin_id = req.params.id;
  const data = await Admin.findOne({_id:admin_id});
  if(data){
    const {school_name, school_logo} = data;
    res.status(200).json({school_name, school_logo})
  }
  else{
    res.status(200).json({school_name:"JB School", school_logo:"logo"});
  }
  }
  catch(error){
    res.status(409).json({ message : error.message })
  }
});

// teacher names for Result in Teacher portal
router.get('/teachernames/:adminId', async (req, res) => { 
    const adminId = req.params.adminId;
    try {
        const allTeachers = await Teacher.find({underBy:adminId}).select('name _id'); // Filtering only 'name' and 'id' fields
        return res.status(201).json(allTeachers);
    } catch (e) {
        return res.status(409).json({ error: e.message });
    }
});

router.get('/studentnames/:adminId', async (req, res) => { 
    const adminId = req.params.adminId;
    try {
        const allStudent = await Student.find({underBy:adminId}).select('name _id'); // Filtering only 'name' and 'id' fields
        return res.status(201).json(allStudent);
    } catch (e) {
        return res.status(409).json({ error: e.message });
    }
});


router.post('/savesubjects', async (req, res) => {
    try {
        const resp = await Subject.findOneAndUpdate({underBy: req.body.underBy,class: req.body.class},req.body,{ upsert: true});
        if (resp.nModified === 0) {
          return res.status(409).json({ message: "Failed to update" });
        }
        return res.status(201).json({ resp, status: 201 });
    } catch (e) {
        return res.status(409).json({ "error": e.message });
    }
})

router.post('/saveexamtype', async (req, res) => {
    try {
        const resp = await ExamType.findOneAndUpdate({underBy: req.body.underBy, class: req.body.class},req.body,{ upsert: true});
        return res.status(201).json({ resp, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/getsubjects/:adminId/:class', async (req, res) => { 
  const clss = req.params.class;
  const adminId = req.params.adminId;
  try {
    const data = await Subject.find({underBy: adminId, class:clss});
    return res.status(201).json(data);
  } catch (e) {
    return res.status(409).json({ error: e.message });
  }
});

router.get('/getexamtype/:adminId/:class', async (req, res) => { 
  const clss = req.params.class;
  const adminId = req.params.adminId;
  try {
    const data = await ExamType.find({underBy:adminId, class:clss}); 
    return res.status(201).json(data);
  } catch (e) {
    return res.status(409).json({ error: e.message });
  }
});

router.get('/getstudentsname/:adminId/:class', async (req, res) => { 
  const clss = req.params.class;
  const adminId = req.params.adminId;

  const regex = /([0-9]+)([A-Za-z]+)/;
  const matches = clss.match(regex);

  if (matches && matches.length === 3) {
    const classNumber = matches[1];
    const section = matches[2];
    try {
      const data = await Student.find({underBy: adminId, class:classNumber, section:section}).select('name _id'); 
      return res.status(201).json(data);
    } catch (e) {
      return res.status(409).json({ error: e.message });
    }
  }

});

router.post('/saveresult', async (req, res) => {
  try {
      const resp = await Result.findOneAndUpdate({underBy: req.body.underBy, class: req.body.class,session: req.body.session,examType: req.body.examType},req.body,{ upsert: true,new: true});
      return res.status(201).json({ resp, status: 201 });
  } catch (e) {
      return res.status(409).json({ "error": e.message });
  }
})

router.post('/getresult/:adminId', async (req, res) => {
  const adminId = req.params.adminId;
  try {
      const resp = await Result.find({underBy:adminId, class: req.body.class, session: req.body.session, examType: req.body.examType}).sort({ date_created: 1 });
      if (!resp) {
        return res.status(409).json({ message: "Failed to find" });
      }
      return res.status(201).json(resp);
  } catch (e) {
      return res.status(409).json({ "error": e.message });
  }
})

router.get('/getresult/:id', async (req, res) => {
  const result_id = req.params.id;
  try {
      const resp = await Result.find({_id:result_id});
      if (!resp) {
        return res.status(409).json({ message: "Failed to find" });
      }
      return res.status(201).json(resp);
  } catch (e) {
      return res.status(409).json({ "error": e.message });
  }
})

router.get('/resultrequest/:id', async (req, res) => {
  const admin_id = req.params.id;
  try {
      const resp = await Result.find({underBy:admin_id,approved: false,editable:false});
      if (!resp) {
        return res.status(409).json({ message: "Failed to find" });
      }
      return res.status(201).json(resp);
  } catch (e) {
      return res.status(409).json({ "error": e.message });
  }
})

router.patch('/approveresult/:result_id/:admin_id',async (req, res) => {
  const { result_id, admin_id } = req.params;
  const data = await Result.findOneAndUpdate({_id:result_id}, { approved: true, editable:true }, { upsert: true})
  if (data.nModified === 0) {
    return res.status(404).json({ message: "Result is not approved" });
  }
  try {
      const resp = await Result.find({underBy:admin_id,approved: false,editable:false});
      if (!resp) {
        return res.status(409).json({ message: "Failed to find" });
      }
      return res.status(201).json(resp);
  } catch (e) {
      return res.status(409).json({ "error": e.message });
  }
});

router.patch('/declineresult/:result_id/:admin_id',async (req, res) => {
  const { result_id, admin_id } = req.params;
  const data = await Result.findOneAndUpdate({_id:result_id}, { approved: false, editable:true }, { upsert: true})
  if (data.nModified === 0) {
    return res.status(404).json({ message: "Result approval declined Failed" });
  }
  try {
      const resp = await Result.find({underBy:admin_id,approved: false,editable:false });
      if (!resp) {
        return res.status(409).json({ message: "Failed to find" });
      }
      return res.status(201).json(resp);
  } catch (e) {
      return res.status(409).json({ "error": e.message });
  }
});

router.patch('/lockresult/:result_id',async (req, res) => {
  const result_id= req.params.result_id;
  const data = await Result.findOneAndUpdate({_id:result_id}, { locked: true, editable: false }, { upsert: true, new:true})
  if (data.nModified === 0) {
    return res.status(404).json({ message: "Title not updated" });
  }
  return res.status(201).json(data);
  
});

router.post('/unlockreq', async (req, res) => {
    try {
        const new_resultreq = new ResultReq(req.body);
        const resp = await new_resultreq.save();
        return res.status(201).json({ resp, status: 201 });
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.get('/unlockreq/:id', async (req, res) => {
  const admin_id= req.params.id;
    try {
        const all_unlockresultreq = await ResultReq.find({underBy:admin_id}).sort({ date_created: 1 });
        return res.status(201).json(all_unlockresultreq);
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.delete('/unlockreq/:reqid', async (req, res) => {
  const request_id= req.params.reqid;
    try {
        const data = await ResultReq.deleteOne({_id:request_id});
        return res.status(200).json(data);
    } catch (e) {
        return res.json({ "error": e.message });
    }
})

router.patch('/unlockreq/:result_id',async (req, res) => {
  const {result_id } = req.params;
  const data = await Result.findOneAndUpdate({_id:result_id}, {locked:false, editable:true })
  if (data.nModified === 0) {
    return res.status(404).json({ message: "Title not updated" });
  }
  return res.status(201).json({ data, status: 201 });
});

router.post('/studentresults', async (req, res) => {
  try {
    const { studentId, adminId, stuclass } = req.body;

    const studentResult = await Result.find({
      class: stuclass,
      underBy: adminId,
      "locked": true,
      [`studentsMarks.${studentId}`]: { $exists: true }
    });

    if (studentResult.length === 0) {
      return res.status(404).json({ message: `No results found for student ID ${studentId} in class ${stuclass} under admin ${adminId}.` });
    }

    const formattedResults = studentResult.map(result => {
      return {
        session: result.session,
        examType: result.examType,
        totalSubjectMarks: result.totalSubjectMarks,
        marks: result.studentsMarks[studentId]
      };
    });

    res.status(200).json({ studentId, results: formattedResults });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/saveReceipt', async (req, res) => {
  try {
      const new_receipt= new FeeReceipt(req.body);
      const resp = await new_receipt.save();
      return res.status(201).json(resp);
  } catch (e) {
      return res.json({ "error": e.message });
  }
});

router.get('/saveReceipt/:sid', async (req, res) => {
  const studentId= req.params.sid;
  try {
      const new_receipt= await FeeReceipt.find({studentId:studentId});
      return res.status(201).json(new_receipt);
  } catch (e) {
      return res.json({ "error": e.message });
  }
});


router.post('/feeSetValidation/:type/:adminId/:session', async (req, res) => {
  const {type,adminId,session}= req.params;
  try {
      const new_req= new FeeReq({type,adminId,session, data:req.body }); //can change to findOneAndUpdate
      const resp = await new_req.save();
      return res.status(201).json({"msg": "success" ,resp});
  } catch (e) {
      return res.json({ "msg": e.message });
  }
});

router.get('/allFeeReq/:adminId', async (req, res) => {
  const adminId= req.params.adminId;
  try {
      const resp= await FeeReq.find({type:"feeSet", adminId});
      return res.status(201).json(resp);
  } catch (e) {
      return res.json({ "error": e.message });
  }
});

router.get('/feeApproval', async (req, res) => {
  try {
      const resp= await FeeReq.find({type:"feeSet", status:"Sent" });
      return res.status(201).json(resp);
  } catch (e) {
      return res.json({ "error": e.message });
  }
});

router.patch('/feeApproved/:id', async (req, res) => {
  const id= req.params.id;
  try {
      const resp= await FeeReq.findOneAndUpdate({_id:id}, {status:"Approved" }, {new:true});
      const result= await FeeReq.find({type:"feeSet", status:"Sent" });
      return res.status(201).json(result);
  } catch (e) {
      return res.json({ "error": e.message });
  }
});

router.patch('/feeDeclined/:id', async (req, res) => {
  const id= req.params.id;
  try {
      const resp= await FeeReq.findOneAndUpdate({_id:id}, {status:"Declined"},{new:true});
      const result= await FeeReq.find({type:"feeSet", status:"Sent" });
      return res.status(201).json(result);
  } catch (e) {
      return res.json({ "error": e.message });
  }
});

router.get('/feeUnlock', async (req, res) => {
  try {
      const result= await FeeReq.find({type:"feeUnlock"});
      return res.status(201).json(result);
  } catch (e) {
      return res.json({ "error": e.message });
  }
});

router.post('/updatePayroll/:session/:month', async (req, res) => {
  const { session, month } = req.params;
  const payrollData = req.body;

  try {
    for (let staffData of payrollData) {
      const { staffId, ...monthlyData } = staffData;

      // Find the staff by ID
      const staff = await Staff.findById(staffId);

      if (!staff) {
        return res.status(404).json({ "msg": "Staff not found" });
      }

      // Find the session by name
      const existingSessionIndex = staff.sessions.findIndex(s => s.session_name === session);

      if (existingSessionIndex === -1) {
        // Session not found, create a new session
        const newSession = {
          session_name: session,
          months: new Map([[month, monthlyData]]), // Create a new Map with the month data
        };
        console.log("newSession",newSession)
        staff.sessions.push(newSession);
      } else {
        // Find the month in the session
        const existingMonth = staff.sessions[existingSessionIndex].months.get(month);

        if (!existingMonth) {
          // Month not found, create a new month
          staff.sessions[existingSessionIndex].months.set(month, monthlyData);
        } else {
          // Update the existing month data with new payroll data
          for (const key in monthlyData) {
            existingMonth[key] = monthlyData[key];
          }
        }
      }

      // Save the changes
      await staff.save();
    }

    return res.status(201).json({ "msg": "Success" });
  } catch (e) {
    return res.status(500).json({ "msg": e.message });
  }
});


router.patch('/paySalary', async (req, res) => {
  const {staffId,session,month, inputAmount}= req.body;
  try {
    const staff =  await Staff.findById(staffId);

    const existingSessionIndex = staff.sessions.findIndex(s => s.session_name === session);
    
    if (!staff) {
      return res.status(404).json({ "msg": `Staff not found for ${session} session.` });
    }

    const existingMonth = staff.sessions[existingSessionIndex].months.get(month);
    if (!existingMonth) {
      // Month not found
      return res.status(404).json({ "msg": `Payroll Data not found for ${month} month.` });
    } else {
      existingMonth['remaining_amount'] = inputAmount;
    }
    await staff.save();
    return res.status(201).json({ "msg": "Success" });

  } catch (e) {
    return res.json({ "msg": e.message });
  }
});


module.exports = router;