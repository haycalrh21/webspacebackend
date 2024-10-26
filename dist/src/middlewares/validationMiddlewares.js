import { ZodError } from "zod";
export function validateData(schema) {
    return (req, res, next) => {
        console.log(req.body);
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res.status(400).json({ error: errorMessage });
            }
            else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    };
}
