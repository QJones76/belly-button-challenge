// Add a function to clean up otuLabel strings
const wrapText = (str, br = '<br>') => {
  // Split the string at each semicolon and join with a line break
  return str.split(';').join(br);
};



// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadataField = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let result = metadataField.filter(obj => obj.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {

      // The .html() allows you to add HTML tags and will interpret them.
      // Use .text() method if you don't have any HTML tags to add
      metadataPanel.append("p").html(`<b>${key.toLocaleUpperCase()}:</b> ${value}`); 
    });
  });
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sampleField = data.samples;

    // Filter the samples for the object with the desired sample number
    // Using find instead of filter to return the first object that matches instead an array of matching values.
    let chosenSample = sampleField.filter(obj => obj.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuIDs = chosenSample.otu_ids;
    let otuLabels = chosenSample.otu_labels;
    let sampleValues = chosenSample.sample_values;

    // Build a Bubble Chart
    let trace = [{
      x: otuIDs,
      y: sampleValues,
      text: otuIDs.map((id, index) => 
        `<b>OTU ID:</b> ${id}<br>---------------------------<br><b>Sample Value:</b> ${sampleValues[index]}<br>---------------------------<br><b>Sample Label:</b><br>${wrapText(otuLabels[index])}`),
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: [ // Custom color scale for bubbles
          [0, "#B63447"],
          [0.25, "#FF6F31"],
          [0.5, "#347ab6"],
          [0.75, "#31D8FF"],
          [1, "#34B66F"]
        ],
        showscale: true
      },

      hoverinfo: "text" // This means only the text field will be visible on the tooltip popups

    }];

    let layout = {
      title: `Bacteria Culters for Sample ${sample}`,
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"}
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", trace, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let labels = otuIDs.slice(0, 10).map(id => `OTU ${id}`).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = [{
      type: "bar",
      x: sampleValues.slice(0, 10).reverse(),
      y: labels,
      text: otuLabels.slice(0, 10).reverse(),
      orientation: 'h'
    }];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Sample Values"},
      yaxis: {title: "OTU ID"}
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout)
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let namesField = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    namesField.forEach(name => {
      dropdownMenu.append("option")
        .text(name) // Sets each name as an option in the dropdown
        .attr("value", name); // Set the name as the optoin's value attribute
    });

    // Get the first sample from the list
    let sample = namesField[0];

    // Build charts and metadata panel with the first sample
    buildCharts(sample);
    buildMetadata(sample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Add the event listener
d3.select("#selDataset").on("change", function() {
  
  // Get the value of selected option
  let newSample = d3.select(this).property("value");

  // Call optionChanged function to update metadata and charts
  optionChanged(newSample);

});

// Initialize the dashboard
init();
