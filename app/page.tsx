"use client"

import { useState } from "react";

type CodeResponse = {
  issues : {
    critical : string[]
    major : string[]
    minor : string[]
  },
  explanation : string
  improved_code : string
}

export default function Home() {
  const[response, setResponse] = useState<CodeResponse | null>(null);
  const[code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function codeReviewCall(){
    setResponse(null);
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        code
      })
    })

    const data = await res.json();
    console.log(data.message);
    const cleaned = data.message.replace(/```json|```/g, "");
    try{
      const parsed = JSON.parse(cleaned);
      console.log("Valid JSON")
      setResponse(parsed);
    }catch(e){
      console.error("Parsing Failed", data.message);
    }finally{
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-semibold">Explain My Code</h1>
        <p className="text-neutral-400 mt-2">
          AI debugging companion
        </p>

        <div className="flex flex-col gap-2">
          <label>Enter Your code Here</label>
          <textarea
          value={code}
          onChange={(e)=>setCode(e.target.value)}
          />
        </div>

        <button onClick={codeReviewCall} disabled={loading} className="cursor-pointer disabled:cursor-not-allowed mb-10">
          {loading ? "Analyzing..." : "Analyze"}
        </button>
        
        {loading && <p className="text-blue-500">Analyzing code...</p>}

        {response && (
          <>
            <p>{response.explanation}</p>

            {response.issues.critical.length===0 && (
              <h1 className="text-green-700">No critical issues found </h1>
            )}

            {response.issues.major.length === 0 && response.issues.minor.length === 0 && (
              <p className="text-gray-500">No major or minor issues</p>
            )}

            {response.issues.critical.length > 0 && (
              <>
                <h2 className="text-red-500">Critical Issues</h2>
                <ul>
                  {response.issues.critical.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </>
            )}

            {response.issues.major.length > 0 && (
              <>
                <h2 className="text-yellow-500">Major Issues</h2>
                <ul>
                  {response.issues.major.map((issue, i)=>(
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </>)}
            
            {response.issues.minor.length > 0 && (
              <>
                <h2 className="text-green-500">Minor Issues</h2>
                <ul>
                  {response.issues.minor.map((issue, i)=>(
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </>)}

            <pre className="bg-neutral-900 text-white p-4 rounded">{response.improved_code}</pre>
          </>
        )}
      </div>
    </main>
  );
}
