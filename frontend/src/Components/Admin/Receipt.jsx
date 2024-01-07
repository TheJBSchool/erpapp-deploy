import React from 'react';

const Receipt = React.forwardRef(({ receiptData }, ref) => {  
  const currDate = new Date().toLocaleDateString('en-GB');
  const {
    schoolName,
    underBy,
    receiptNo,
    date,
    session,
    studentId,
    studentClass,
    studentSection,
    studentRollNo,
    studentName,
    studentFatherName,
    quater,
    adm_fee,
    acdm_fee,
    late_fee,
    totalToBePaid,
    paymentAmount,
    remainingAmount,
    total_adm_fee,
    total_acdm_fee
  } = receiptData;

  const numberToWords = (num) => {
    const ones = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    const tens = [
      '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
    const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

    if (num === 0) return 'zero';

    const chunks = [];
    while (num > 0) {
      chunks.push(num % 1000);
      num = Math.floor(num / 1000);
    }

    let words = '';
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      if (chunk !== 0) {
        const chunkWords = [];
        const hundreds = Math.floor(chunk / 100);
        const tensUnits = chunk % 100;

        if (hundreds !== 0) {
          chunkWords.push(ones[hundreds] + ' hundred');
        }

        if (tensUnits !== 0) {
          if (tensUnits < 20) {
            chunkWords.push(ones[tensUnits]);
          } else {
            chunkWords.push(tens[Math.floor(tensUnits / 10)]);
            chunkWords.push(ones[tensUnits % 10]);
          }
        }

        if (i > 0) {
          chunkWords.push(scales[i]);
        }

        words = chunkWords.join(' ') + ' ' + words;
      }
    }

    return words.trim();
  };

  const convertedPaymentAmount = numberToWords(paymentAmount);


  return (
    <div ref={ref} className="mx-auto max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 font-serif">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">{schoolName} School</h1>
        <div className='flex justify-between'>
          <p>Date: {currDate}</p>
          <p>Receipt No: {receiptNo}</p>
        </div>
        <hr className='my-2'/>
        <h1 className='font-bold text-red-600'>Parent Copy</h1>

        <p className='text-end'>Session:{session}</p>
        <div className="flex justify-between w-6/12">
          <div >
            <p>Student's Name:</p>
            <p>Father's Name:</p>
            <p>Roll No:</p>
            <p>Class:</p>
            <p>Section:</p>
          </div>
          <div>
            <p>{studentName}</p>
            <p>{studentFatherName}</p>
            <p>{studentRollNo}</p>
            <p>{studentClass}</p>
            <p>{studentSection}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2"><span className=' font-sans'>{quater} </span>Fees</h2>
        {total_adm_fee && (
          <div className='flex justify-between'>
            <p>Total Admission Fee:</p>
            <p>Rs {total_adm_fee}</p>
          </div>
        )}
        <div className='flex justify-between'>
          <p>Total Acadmic Fee:</p>
          <p>Rs {total_acdm_fee}</p>
        </div>
        <hr />
        {total_adm_fee && (
          <div className='flex justify-between'>
            <p>Remaining Admission Fee:</p>
            <p>Rs {adm_fee}</p>
          </div>
        )}
        <div className='flex justify-between'>
          <p>Remaining Acadmic Fee:</p>
          <p>Rs {acdm_fee}</p>
        </div>
        {/* Include other fee descriptions here */}
        <div className='flex justify-between'>
          <p>Late Fee:</p>
          <p>Rs {late_fee}</p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Total Payment Details</h2>
        <div className='flex justify-between'>
          <p>Total To Be Paid:</p>
          <p>Rs {totalToBePaid}</p>
        </div>
        <div className='flex justify-between'>
          <p>Payment Amount:</p>
          <p>- Rs {paymentAmount}</p>
        </div>
        <hr className='my-1'/>
        <div className='flex justify-between'>
          <p>Remaining Amount:</p>
          <p>Rs {remainingAmount}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="italic">Total Fee Paid in Words: <strong>{convertedPaymentAmount}</strong></p>
        <div className='flex flex-col items-end mb-10 mt-4'>
          <p className="mt-4">Signature</p>
          <p>{schoolName}</p>
        </div>
      </div>
    </div>
  );
});
export default Receipt;
