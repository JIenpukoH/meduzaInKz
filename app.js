
var yahooSql = 'select title,pubDate,link,description from rss where url="http://feeds.feedburner.com/meduza/biLG?format=xml"';
var meduzaRss =  'https://query.yahooapis.com/v1/public/yql?q='+encodeURI(yahooSql)+'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
moment.locale('ru');
function getAmpLink(link){
    //remove protocol
    var cleanUrl = link.replace(/.*?:\/\//g, "");
    return 'https://cdn.ampproject.org/c/s/amp.'+cleanUrl;
}
$('.open_url .btn').click(function(e){
    var link = $('#url').val();
    window.open(getAmpLink(link),'_blank')
});
function updateDate(){
    $('.pubdate span').each(function() {
        var now = (new Date( $(this).text()).toISOString());
        $(this).text( moment(now).format('DD.MM.YYYY HH:mm'));

    });
}
$.getJSON(meduzaRss, function(data) {
    var items = data.query.results.item;
    if(items.length > 0){
        $('.loading').hide();
        $.each( items, function( index,item ) {
            link = getAmpLink(item.link);
            var item_block = '<div class="item">' +
                '<a href="'+link+'" class="title" target="_blank">'+item.title+'</a>' +
                 '<div class="pubdate">Дата публикации: <span>'+item.pubDate+'</span></div>'+
                '<div class="body">'+item.description+'</div>' +
                '</div>';
            $('.content').append(item_block);
        });
        updateDate();

    }

}, "jsonp");
