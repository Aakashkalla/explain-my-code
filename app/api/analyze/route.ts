import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req : Request){
    try{
        const {code} = await req.json();
        const response = await ai.models.generateContent({
            model : "gemma-4-31b-it",
            contents : `Analyze the following code. 
                        Return STRICT JSON only in this format : 
                        {
                            "explanation" : "brief explanation",
                            "issues" : ["issue 1", "issue 2"],
                            "improved_code" : "improved version of code"
                        }

                        Rules: 
                        - Identify CRITICAL issues first : 
                            - crashes
                            - security vulnerabilities
                            - incorrect logic
                        - Then identify
                            - performance problems
                            - scalability limitations
                            - bad practices
                        - DO NOT give generic advice 
                        - Be specific and direct 
                        - Explain WHY each issue is a problem
                        - Be direct and critical
                        - Identify real bugs and edge cases 
                        - DO NOT return markdown
                        - DO NOT add extra text outside JSON
                        Code : ${code}`,
            config: {
                systemInstruction: "You are senior software engineer who reviews code like a boss!",
                thinkingConfig : {
                    thinkingLevel : ThinkingLevel.HIGH
                }
            },
        });

        if(response.text){
            return Response.json({
                success : true,
                message : response.text
            })
        }else{
            return Response.json({
                success : false,
                message : "No response from AI"
            })
        }
        
    }catch(e : any){
        return Response.json({
            success : false,
            message : e.message ||"Something went Wrong"
        })
    }
    
}