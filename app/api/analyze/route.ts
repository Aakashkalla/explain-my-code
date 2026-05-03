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
                            "issues" : {
                                "critical" : ["issue 1"],
                                "major" : ["issue 2"],
                                "minor" : ["issue 3"]
                            }, 
                            "improved_code" : "improved version of code"
                        }

                        Rules: 
                        - Classify issues into : 
                            - "critical" : crashes, security vulnerabilities, incorrect logic that breaks functionality
                            - "major": important issues that affect performance, scalability, or reliability but do not immediately break the app
                            - "minor": best practices, code quality improvements, or suggestions
                        - DO NOT label everything as critical 
                        - Only mark something as critical if it will break functionality or create a serious security risk.
                        -If the code is valid and functional:
                            - "critical" must be an empty array[]
                            -explicity mention in explanation : "No critical issues found"
                        - Explain WHY each issue is a problem (briefly, inside each issue line if needed)
                        - Always include all fields ("critical", "major", "minor") even if empty
                        - Use empty arrays [] when no issues exist in a category
                        - Limit each category to maximum 5 issues
                        - DO NOT give generic advice 
                        - Be specific and direct 
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