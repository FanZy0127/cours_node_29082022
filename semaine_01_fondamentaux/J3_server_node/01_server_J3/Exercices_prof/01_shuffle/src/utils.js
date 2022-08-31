const capitalize = (string) => string[0].toUpperCase() + string.substring(1).toLowerCase();

module.exports = {
  shuffle: (array) => array.sort(() => 0.5 - Math.random()),
  htmlContent: (array) => {
    let content = "";

    for (const { name, address, notes } of array) {
      let nominator = 0;
      for (const note of notes) nominator += note;

      const average = (nominator / notes.length).toFixed(2);

      let mention = null;

      if (average >= 16) mention = "Very well";
      else if (average >= 14) mention = "Well";
      else if (average >= 12) mention = "Quite well";
      else if (average >= 10) mention = "Fair";
      else mention = "Nothing";

      content += `
        <tr>
          <td>${capitalize(name)}</td>
          <td>${capitalize(address)}</td>
          <td>${notes}</td>
          <td>${average}</td>
          <td>${mention}</td>
        </tr>
      `;
    }

    return content;
  },
};
