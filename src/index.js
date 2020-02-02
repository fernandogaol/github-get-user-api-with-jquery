'use strict';

function displayResults(responseJson, maxResults) {
  $('#results-list').empty();

  //loop through results and make a list of repos, including link and description
  for (let i = 0; i < responseJson.length && i < maxResults; i++) {
    let user = responseJson[0].owner.login;
    $('#results-list').append(
      ` <li>
            <h2><a href="${responseJson[0].owner.html_url}" target="blanket">GitHub Profile</a></h2>
            <h4><a href="${responseJson[i].html_url}" target="blanket">Project Name:${responseJson[i].name}</a></h4>
            <h4>User: <span>${user}</span></h4>
        </li>`
    );
  }
  //removes hidden class to display results
  $('#results').removeClass('hidden');
}

function getUser(searchTerm, maxResults = 10) {
  const url = `https://api.github.com/users/${searchTerm}/repos`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();

    getUser(searchTerm, maxResults);
  });
}

$(watchForm);
