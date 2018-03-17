//e95105e255ab4ca5b069b303112caa05

var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=e95105e255ab4ca5b069b303112caa05';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    })


$.ajax({
	url: url,
	type: 'GET'
}).then(function(response) {
	console.log(response);
	var articles = response.articles;
	var col_one = $(".img-col-1");
	var col_two = $(".img-col-2");
	var col_three = $(".img-col-3");

	for (var c = 0; c < 3; c++) {
		if (c === 0){
			for (var r = 0; r < 7; r++) {
				generateCard(articles[r], col_one);
			}
		}else if (c === 1){
			for (var r = 8; r < 15; r++) {
				generateCard(articles[r], col_two);
			}
		}else if(c === 2){
			for (var r = 16; r < 20; r++) {
				generateCard(articles[r], col_three);
			}	
		}
	}

	// for (var i = 0; i < articles.length; i++) {
	// 	$("#news-container").append(generateCard(articles[i]));
	// }



	// generateCard(articles[i]);

});

function generateCard(arrItem, target){
	var card_wrapper = $("<div>");

	var card_body_link = $("<a>").attr({
		href: arrItem.url
	}).removeClass('btn btn-primary');

	var card = $("<div class='card'>");

	if(arrItem.urlToImage != null) {
		var img = $("<img class='card-img-top'>").attr({
			src: arrItem.urlToImage,
			alt: "Image"
		});
		card.append(img);
	}
	var card_body = $("<div class='card-body'>");
	var card_body_h5 = $("<h5 class='card-title'>").text("Source: " + arrItem.source.name);
	var card_body_p = $("<p class='card-text'>").text(arrItem.title);

	card.append(card_body);
	card_body.append(card_body_h5,card_body_p);
	card_body_link.append(card);
	card_wrapper.append(card_body_link);
	target.append(card_wrapper);
}

// function 

// 		<div class="col-3">
// 			<div class="card">
// 			  <img class="card-img-top" src="..." alt="Card image cap">
// 			  <div class="card-body">
// 			    <h5 class="card-title">Card title</h5>
// 			    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
// 			    <a href="#" class="btn btn-primary">Go somewhere</a>
// 			  </div>
// 			</div>
// 		</div>