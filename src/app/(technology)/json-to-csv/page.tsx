"use client";

import { useState } from "react";
import CalculatorSEO from "@/components/CalculatorSEO";

export default function JsonToCsv() {
  const [jsonInput, setJsonInput] = useState(
    '[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]',
  );
  const [csvOutput, setCsvOutput] = useState("");
  const [error, setError] = useState("");

  const convertToCsv = () => {
    setError("");
    setCsvOutput("");

    try {
      const parsed = JSON.parse(jsonInput);

      // Ensure array
      const data = Array.isArray(parsed) ? parsed : [parsed];

      if (data.length === 0) {
        setError("JSON Array is empty.");
        return;
      }

      if (typeof data[0] !== "object" || data[0] === null) {
        setError("JSON must contain an array of objects.");
        return;
      }

      // Extract headers
      const headers = new Set<string>();
      data.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          Object.keys(item).forEach((key) => headers.add(key));
        }
      });

      const headerArray = Array.from(headers);

      const escapeCsv = (val: any) => {
        if (val === null || val === undefined) return "";
        let str = String(val);
        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
          str = '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
      };

      const csvRows = [];
      csvRows.push(headerArray.map(escapeCsv).join(","));

      data.forEach((item) => {
        if (typeof item === "object" && item !== null) {
          const row = headerArray.map((header) => escapeCsv(item[header]));
          csvRows.push(row.join(","));
        }
      });

      setCsvOutput(csvRows.join("\n"));
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csvOutput).then(() => {
      alert("CSV copied to clipboard!");
    });
  };

  const downloadCsv = () => {
    const blob = new Blob([csvOutput], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-emerald-900 flex items-center justify-center font-mono">
          <span className="mr-3">="{}"</span> JSON to CSV
        </h1>
        <p className="text-emerald-700 text-lg max-w-2xl mx-auto">
          Convert arrays of JSON objects into formatted Comma-Separated Values
          effortlessly.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200 mb-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Column */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
              Input JSON
            </label>
            <button
              onClick={() => setJsonInput("")}
              className="text-xs bg-zinc-100 px-3 py-1 rounded font-bold uppercase text-zinc-600 hover:bg-zinc-200"
            >
              Clear
            </button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full flex-1 min-h-[400px] bg-zinc-900 text-emerald-300 rounded-xl border border-zinc-300 shadow-inner p-4 focus:border-emerald-500 font-medium font-mono text-sm transition-all outline-none resize-y"
            placeholder='[{"col1": "val1", "col2": "val2"}]'
            spellCheck="false"
          />

          <button
            onClick={convertToCsv}
            className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 uppercase tracking-widest text-lg"
          >
            Convert to CSV 👉
          </button>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold text-center text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Output Column */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-bold text-zinc-700 uppercase tracking-wide">
              Output CSV
            </label>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                disabled={!csvOutput}
                className="text-xs bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded font-bold uppercase text-emerald-800 hover:bg-emerald-200"
              >
                Copy
              </button>
              <button
                onClick={downloadCsv}
                disabled={!csvOutput}
                className="text-xs bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 rounded font-bold uppercase text-white hover:bg-emerald-700"
              >
                Download
              </button>
            </div>
          </div>
          <textarea
            value={csvOutput}
            readOnly
            className="w-full flex-1 min-h-[400px] bg-zinc-50 text-zinc-800 rounded-xl border border-zinc-300 shadow-inner p-4 focus:bg-white font-medium font-mono text-sm transition-all outline-none resize-y whitespace-pre"
            placeholder="CSV output will appear here..."
            spellCheck="false"
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON to CSV Converter",
            operatingSystem: "All",
            applicationCategory: "DeveloperApplication",
          }),
        }}
      />

      <div className="mt-8">
        <CalculatorSEO
          title="JSON to CSV Converter & Exporter"
          whatIsIt={
            <>
              <p>
                The <strong>JSON to CSV Converter</strong> automatically
                flattens arrays of deeply nested JSON (JavaScript Object
                Notation) data into clean, spreadsheet-ready CSV
                (Comma-Separated Values) files.
              </p>
              <p>
                While developers love JSON for moving data across the internet,
                data analysts and business teams rely entirely on Excel, Google
                Sheets, and SQL databases. This tool instantly bridges the gap
                between raw web code and usable business spreadsheets.
              </p>
            </>
          }
          formula={
            <>
              <p>
                The conversion process requires the parser to extract the unique
                "Keys" from the JSON objects to act as the Column Headers, and
                then map every subsequent "Value" into the correct row:
              </p>
              <div className="bg-emerald-50 p-4 rounded-lg font-mono text-[14px] shadow-sm my-4 text-emerald-900 border border-emerald-100 flex flex-col gap-2">
                {`[
  { "id": 1, "name": "Apple", "price": 1.99 },
  { "id": 2, "name": "Banana", "price": 0.99 }
]`}
                <div className="text-center font-bold text-emerald-600">
                  ↓ Converts To ↓
                </div>
                {`id,name,price
1,Apple,1.99
2,Banana,0.99`}
              </div>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>Headers:</strong> The parser scans the first object
                  (or all objects) to generate a master list of all possible
                  column names.
                </li>
                <li>
                  <strong>Delimiters:</strong> A comma (,) acts as the wall
                  between columns. A line break (\n) signifies a brand new row.
                </li>
                <li>
                  <strong>Escaping:</strong> If a piece of data actually
                  contains a comma (like "Smith, John"), the converter must wrap
                  it in double-quotes to prevent Excel from accidentally
                  splitting his name across two columns.
                </li>
              </ul>
            </>
          }
          example={
            <>
              <p>
                You download a massive database of new users from your website.
                The raw API output is in JSON format, but your marketing team
                needs to load those emails into Mailchimp.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                <li>
                  <strong>The Challenge:</strong> Mailchimp software only
                  accepts .CSV uploads, while your server only spits out raw
                  JSON grids.
                </li>
                <li>
                  <strong>The Solution:</strong> You paste the giant JSON array
                  into this tool. It instantly rips out all the Javascript
                  syntax (curley braces, colons, brackets) and reformats names
                  and emails into a clean, flat 2D grid ready for download.
                </li>
              </ul>
            </>
          }
          useCases={
            <ul className="list-disc pl-6 space-y-4 text-gray-700">
              <li>
                <strong>Financial Reporting:</strong> Extracting chaotic sales
                data payloads from Stripe or PayPal's Developer APIs and
                flattening them so accountants can run pivot tables in Excel.
              </li>
              <li>
                <strong>Database Migrations:</strong> Exporting custom user data
                from a NoSQL database (like MongoDB, which stores JSON) into a
                format that can be instantly imported into a rigid SQL database
                (like MySQL or Postgres).
              </li>
              <li>
                <strong>Lead Generation:</strong> Web scrapers pull thousands of
                messy product reviews in JSON format, using this tool to convert
                them into a clean CSV for sentiment analysis in Python Pandas.
              </li>
            </ul>
          }
          faqs={[
            {
              question: "What happens if my JSON objects have different keys?",
              answer:
                "A smart converter handles this gracefully. It scans every single object to build a 'Master Header' list. If Object #1 has 'name' and Object #2 has 'name' AND 'age', the converter simply leaves the 'age' column blank for Object #1.",
            },
            {
              question:
                "How does the converter handle deeply nested objects inside the JSON?",
              answer:
                "Standard converters either stringify the nested object (turning it into text) or completely flatten it (e.g., turning `address: {city: 'NY'}` into a column named `address.city`). The latter makes for much cleaner spreadsheets.",
            },
            {
              question: "Will opening the CSV in Excel ruin my formatting?",
              answer:
                "It can. Excel is notoriously aggressive at reformatting data. If you have an ID number that starts with a zero (e.g., '0045'), Excel will often aggressively delete the zeros and just display '45'. You must import the data as 'Text' in Excel to avoid this.",
            },
          ]}
          relatedCalculators={[
            {
              name: "JSON Validator",
              path: "/json-validator",
              desc: "Ensure your JSON syntax is 100% correct before attempting to convert it.",
            },
            {
              name: "Regex Tester",
              path: "/regex-tester",
              desc: "Use Regex to clean up or manipulate specific strings inside your CSV cells.",
            },
            {
              name: "Markdown Editor",
              path: "/markdown-editor",
              desc: "Format your flattened data into standard Github tables for documentation.",
            },
          ]}
        />
      </div>
    </div>
  );
}
