const base = process.env.REACT_APP_BASE;

export const login_user = async(obj) => {
    const res = await fetch(`${base}/login`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type" : "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const register_student = async(obj) => {
    const res = await fetch(`${base}/manageStudent`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const register_teacher = async(obj) => {
    const res = await fetch(`${base}/manageTeacher`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const register_admin = async(obj) => {
    const res = await fetch(`${base}/manageAdmin`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const all_admins = async ()=> {
    const res = await fetch(`${base}/admins`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const all_teachers = async ()=> {
    const res = await fetch(`${base}/teachers`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const all_students = async ()=> {
    const res = await fetch(`${base}/students`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const studentUpdate = async (id, dataToUpdate) => {
    const res = await fetch(`${base}/studentUpdate/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate), 
    });
    const ans = await res.json();
    return ans;
}

export const teacherUpdate = async (id, dataToUpdate) => {
    const res = await fetch(`${base}/teacherUpdate/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate), 
    });
    const ans = await res.json();
    return ans;
}

export const adminUpdate = async (id, dataToUpdate) => {
    const res = await fetch(`${base}/adminUpdate/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate), 
    });
    const ans = await res.json();
    return ans;
}

export const studentDelete = async (id) => {
    const res = await fetch(`${base}/studentDelete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
      throw new Error('Failed to delete student');
    }
    const ans = await res.json();
    return ans;
}

export const teacherDelete = async (id) => {
    const res = await fetch(`${base}/teacherDelete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
      throw new Error('Failed to delete teacher');
    }
    const ans = await res.json();
    return ans;
}

export const adminDelete = async (id) => {
    const res = await fetch(`${base}/adminDelete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!res.ok) {
      throw new Error('Failed to delete Admin');
    }
    const ans = await res.json();
    return ans;
}

export const searchTeachers = async (searchData)=> {
    const queryString = new URLSearchParams(searchData).toString();
    const url = `${base}/searchTeachers?${queryString}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Search request failed');
        }
        const ans = await res.json();
        return ans;

    } catch (error) {
        // Handle fetch or JSON parsing errors here
        console.error('Error:', error);
        throw error;
    }
};

export const teacherSearchBar = async (searchData) => {
    const queryString = new URLSearchParams(searchData).toString();
    const url = `${base}/teacherSearchBar?${queryString}`;
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });


        if (!res.ok) {
        throw new Error('Failed to delete teacher');
        }
        const ans = await res.json();
        return ans;
    } catch (error) {
        console.error('Error searching teachers:', error);
        throw error;
    }
};

export const feeSet = async (obj) =>{
    const res = await fetch(`${base}/setFeeStudent`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const updateFees = async () =>{

}

export const getStudent = async (obj) => {
    const res = await fetch(`${base}/getStudent?class=${obj.class}&section=${obj.section}&session=${obj.session}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}
export const getFeeDetails = async(obj) =>{
    const res = await fetch(`${base}/getFeeDetails?class=${obj.class}&session=${obj.session}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const getReceiptNo = async() =>{
    try {
        const res = await fetch(`${base}/retrieve`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.log(`Network res was not ok: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        const invoiceNumber = data.invoiceNumber;
        // console.log('invoiceNumber', invoiceNumber);
        return invoiceNumber;
    } catch (error) {
        console.log('Error generating invoice:', error);
        return 0; 
    }
}
export const updateReceiptNo = async() =>{
    try {
        const res = await fetch(`${base}/updatereceiptno`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            console.log(`Network res was not ok: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        const invoiceNumber = data.invoiceNumber;
        // console.log('invoiceNumber', invoiceNumber);
        return invoiceNumber;
    } catch (error) {
        console.log('Error generating invoice:', error);
        return 0; 
    }
}

export const registerStaff = async (obj) =>{
    const res = await fetch(`${base}/registerStaff`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const getTimetableByClass = async (classValue) => {
  try {
    const response = await fetch(`${base}/timetable/${classValue}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }); 

    if (response.ok) {
      const data = await response.json();
      return data; 
    } else {
      throw new Error('Failed to fetch timetable');
    }
  } catch (error) {
    throw new Error('Error fetching timetable: ' + error.message);
  }
};


export const saveTimetable = async (classValue, timetableData) => {
  try {
    const response = await fetch(`${base}/timetable/${classValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timetableData) // Send timetable data to the backend
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return saved/updated timetable data
    } else {
      throw new Error('Failed to save timetable');
    }
  } catch (error) {
    throw new Error('Error saving timetable: ' + error.message);
  }
};

export const getTeacherTimeTable = async (teacherName) => {
  try {
    const response = await fetch(`${base}/teachertimetable/${teacherName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }); 

    if (response.ok) {
      const data = await response.json();
      return data; 
    } else {
      throw new Error('Failed to fetch timetable');
    }
  } catch (error) {
    throw new Error('Error fetching timetable: ' + error.message);
  }
};


export const saveUploads_lostAndFound = async (formData) => {
     try {
        const response = await fetch(`${base}/lostFound`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
        //   console.log(data.message); // File uploaded successfully
          return data;
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error(error);
      }
}

export const fetchRecentItems = async () => {
    try {
        const response = await fetch(`${base}/recentLostItem`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }); 
        if (response.ok) {
            const data = await response.json();
            return data; 
        } else {
            throw new Error('Failed to fetch timetable');
        }
    } catch (error) {
        throw new Error('Error fetching recentLostItem: ' + error.message);
    }
};

export const student_claim_req = async (Reqdata) => {
    try {
        const response = await fetch(`${base}/claimitem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Reqdata)
        }); 
        if (response.ok) {
            const data = await response.json();
            return data; 
        } else {
             console.log('Faild to send request');
        }
    } catch (error) {
        console.log('Error in send claim request : ' + error.message);
    }
};

export const createNewCircular = async(CircularData) =>{
    try {
        const res = await fetch(`${base}/createcircular`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(CircularData),
        });

        if (!res.ok) {
            console.log(`Network res was not ok: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Failed to create new circular:', error);
        return 0; 
    }
}

export const all_circulars = async ()=> {
    const res = await fetch(`${base}/allcirculars`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const editCircular = async (id, dataToUpdate) => {
    const res = await fetch(`${base}/editCircular/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate), 
    });
    const ans = await res.json();
    return ans;
}
export const deleteCircular = async (id) => {
    const res = await fetch(`${base}/deleteCircular/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const stu_circular = async (classes)=> {
    const res = await fetch(`${base}/stucircular/${classes}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const otpSend = async (user_email) => {
    // console.log(JSON.stringify(email))
     try {

        const response = await fetch(`${base}/emailsend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:user_email}),
        });

        const data = await response.json();
        if(data){
            return data;
        }
        else{
            return "failed";
        }
      } catch (error) {
        console.log(error);
      }
}
export const validateOtp = async (user_email, otpcode) => {
    // console.log(JSON.stringify(email))
     try {

        const response = await fetch(`${base}/validateopt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:user_email, otp:otpcode}),
        });

        const data = await response.json();
        if(data){
            return data;
        }
        else{
            return "failed";
        }
      } catch (error) {
        console.log(error);
      }
}
export const resetPassword = async (user_email, newpsw) => {
    // console.log(JSON.stringify(email))
     try {

        const response = await fetch(`${base}/resetpassword`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:user_email, newpsw:newpsw}),
        });

        const data = await response.json();
        if(data){
            return data;
        }
        else{
            return "failed";
        }
      } catch (error) {
        console.log(error);
      }
}

export const changeTitle = async (id,title) => {
     try {
        const res = await fetch(`${base}/title/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title}),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const updateLogo = async (id, file) => {
  try {

    const res = await fetch(`${base}/uploadLogo/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },  
      body:  JSON.stringify(file),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const schoolNameLogo = async (id)=> {
    const res = await fetch(`${base}/settings/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const all_teachers_names = async ()=> {
    const res = await fetch(`${base}/teachernames`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const all_students_names = async ()=> {
    const res = await fetch(`${base}/studentnames`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const save_subjects = async(obj) => {
    const res = await fetch(`${base}/savesubjects`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const save_examTypes = async(obj) => {
    const res = await fetch(`${base}/saveexamtype`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const get_subjects = async (clss)=> {
    const res = await fetch(`${base}/getsubjects/${clss}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const get_examTypes = async (clss)=> {
    const res = await fetch(`${base}/getexamtype/${clss}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const get_studentsName = async (clss)=> {
    const res = await fetch(`${base}/getstudentsname/${clss}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const save_result = async(obj) => {
    const res = await fetch(`${base}/saveresult`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const ans = await res.json();
    return ans;
}

export const get_result= async (obj)=> {
    const res = await fetch(`${base}/getresult`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const ans = await res.json();
    return ans;
}

export const get_resultById= async (id)=> {
    const res = await fetch(`${base}/getresult/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const ans = await res.json();
    return ans;
}

export const result_approval= async (id)=> {
    const res = await fetch(`${base}/resultrequest/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const ans = await res.json();
    return ans;
}

export const approve_result = async (res_id, admin_id) => {
  try {

    const res = await fetch(`${base}/approveresult/${res_id}/${admin_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },  
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const lock_result = async (res_id) => {
  try {

    const res = await fetch(`${base}/lockresult/${res_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },  
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const unlock_req = async (obj) => {
    console.log("loginRoutes unlock",obj)
    const res = await fetch(`${base}/unlockreq`, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const ans = await res.json();
    return ans;
};

export const all_unlock_resultreq = async (adminId)=> {
    const res = await fetch(`${base}/unlockreq/${adminId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const delete_unlock_resultreq = async (reqId)=> {
    const res = await fetch(`${base}/unlockreq/${reqId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const ans = await res.json();
    return ans;
}

export const approve_unlock_result = async (resultId) => {
  try {

    const res = await fetch(`${base}/unlockreq/${resultId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },  
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};