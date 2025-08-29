const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Alternating caps on the reversed letters-only string
function alternatingCaps(str) {
  let result = "";
  let upper = true;
  for (const ch of str.split("").reverse()) {
    if (/[a-zA-Z]/.test(ch)) {
      result += upper ? ch.toUpperCase() : ch.toLowerCase();
      upper = !upper;
    }
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    // ✅ Validation
    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: `data` must be an array of strings",
      });
    }

    // TODO: replace these with YOUR details
    const fullName = "john_doe";   // full name in lowercase
    const dob = "17091999";        // ddmmyyyy
    const email = "john@xyz.com";
    const roll = "ABCD123";

    const data = req.body.data;

    const even = [];
    const odd = [];
    const alphabets = [];
    const special = [];
    let sum = 0;
    let concatStr = "";

    for (const item of data) {
      const s = String(item); // normalize
      if (/^\d+$/.test(s)) {
        const n = parseInt(s, 10);
        (n % 2 === 0 ? even : odd).push(s);   // numbers must be returned as strings
        sum += n;
      } else if (/^[a-zA-Z]+$/.test(s)) {
        alphabets.push(s.toUpperCase());
        concatStr += s;
      } else {
        special.push(s);
      }
    }

    return res.status(200).json({
      is_success: true,
      user_id: `${fullName}_${dob}`, // format: full_name_ddmmyyyy
      email,
      roll_number: roll,
      odd_numbers: odd,
      even_numbers: even,
      alphabets,
      special_characters: special,
      sum: String(sum),                // sum as a string
      concat_string: alternatingCaps(concatStr),
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
