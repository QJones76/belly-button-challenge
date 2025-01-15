# Belly Button Challenge
---
In this challenge, I took a dataset from [The Public Science Lab](https://robdunnlab.com/projects/belly-button-biodiversit) about belly button bacteria biodiversity and created a dynamic dashboard. I have successfully deployed my dashboard to a GitHub pages which can be found [here](https://qjones76.github.io/belly-button-challenge/).

## Usage
---
When you first load the dashboard, the metadata panel on the left and the two charts will be selected for and displaying relevent information on subject 940. To change the focus, simply select another subject from the dropdown menu located above the metadata panel. On a few of the subjects, they have sample values that are too big for the bubble chart. An example would be subject 1546, who's bubble chart looks like ![this](https://github.com/user-attachments/assets/944245c1-385d-4a28-8dad-41f0429b0765)

To get around this issue, I have changed the text value of the bubble charts to include an arrow function to itterate throught the values and return additional information on the tooltip. Thus, I went from this: 
```
text: otuIDs, 
```
to this:
```
 text: otuIDs.map((id, index) => 
    `OTU ID: ${id}<br>Sample Value: ${sampleValues[index]}`,
```
I also added a dividing line in the tooltips for readability and ease of use. Both charts and the metadata will update after selecting another subject. 

While I didn't directly do any analysis on the data, you can find out more about this from the Public science Lab's [results and data](https://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/).
