$(document).ready(function() {
	$('.delete-dive').on('click', function(e) {
		$target = $(e.target);
		const id = $target.attr('data-id');
		$.ajax({
			type: 'DELETE',
			url: '/api/dives/' + id,
			success: function(response) {
				window.location.href='/api/dives'
			},
			error: function() {
				console.log('error');
			}
		});
	});
});

// Initialize tooltip component
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Initialize popover component
$(function () {
  $('[data-toggle="popover"]').popover()
})