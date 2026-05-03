"use client"

import { useState } from "react";

type CodeResponse = {
  issues : string[]
  explanation : string
  improved_code : string
}

export default function Home() {
  const[response, setResponse] = useState<CodeResponse | null>(null);
  const[code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function codeReviewCall(){
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
    const cleaned = data.message.replace(/```json|```/g, "");
    try{
      const parsed = JSON.parse(cleaned);
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

        <button onClick={codeReviewCall} disabled={loading} className="cursor-pointer disabled:cursor-not-allowed">
          {loading ? "Analyzing..." : "Analyze"}
        </button>
        
        {response && (
          <>
            <p>{response.explanation}</p>

            <ul>
              {response.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>

            <pre>{response.improved_code}</pre>
          </>
        )}
      </div>
    </main>
  );
}
