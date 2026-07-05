import React from "react";
import type { BlockEditorProps } from "../../types";
import type { TrueFalseData } from "./schema";

/** Editor UI for a true/false block: one statement and a correct-answer toggle. */
export function Editor({ data, onChange }: BlockEditorProps<TrueFalseData>) {
  return (
    <div className="el-block-editor el-block-editor--true-false">
      <label className="el-field">
        <span className="el-field__label">Statement</span>
        <textarea
          className="el-input el-textarea"
          value={data.statement}
          placeholder="Type the statement students will judge as true or false"
          onChange={(e) => onChange({ ...data, statement: e.target.value })}
        />
      </label>

      <fieldset className="el-field">
        <legend className="el-field__label">Correct answer</legend>
        <label className="el-field--inline">
          <input
            type="radio"
            name="tf-correct"
            checked={data.correctAnswer === true}
            onChange={() => onChange({ ...data, correctAnswer: true })}
          />
          <span>True</span>
        </label>
        <label className="el-field--inline">
          <input
            type="radio"
            name="tf-correct"
            checked={data.correctAnswer === false}
            onChange={() => onChange({ ...data, correctAnswer: false })}
          />
          <span>False</span>
        </label>
      </fieldset>
    </div>
  );
}
