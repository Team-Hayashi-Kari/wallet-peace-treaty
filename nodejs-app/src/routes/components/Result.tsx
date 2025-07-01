import { type FC } from "react";

const Result: FC<{ result: number | string }> = ({ result }) => (
<div className="resultValue">{result}</div>
);

export default Result;