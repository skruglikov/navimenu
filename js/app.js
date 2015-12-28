;(function ($) {
	$.fn.naviMenu = function() {
		var nav = this,
			menu = ".navi-menu",
			submenu = ".navi-submenu",
			link = ".navi-title",
			prev_scroll = "#prev_scroll",
			next_scroll = "#next_scroll",
			backward = "#backward",
			prev_scroll_button = "<a id=\"prev_scroll\" class=\"navi-prev\" href=\"javascript:void(0)\"></a>",
			next_scroll_button = "<a id=\"next_scroll\" class=\"navi-next\" href=\"javascript:void(0)\"></a>",
			backward_button = "<a id=\"backward\" class=\"navi-backward\" href=\"javascript:void(0)\"></a>",
			tolerance = 10,
			reset = { "left" : 0 },
			location;

		_count = function () {
			if ( Foundation.utils.is_small_only() ) {
				items_displayed = 4;
			} else if ( Foundation.utils.is_medium_only() ) {
				items_displayed = 6;
			} else if ( Foundation.utils.is_large_up() ) {
				items_displayed = 8;
			}
			return items_displayed;
		};

		_items = function ( node ) {
			return node.children();
		};

		_init = function ( node ) {
			var node_width = 0,
				items = _items( node ),
				nav_width = nav.innerWidth(),
				nav_left = nav.offset().left,
				items_displayed = _count();

			if ( items.length >= items_displayed ) {
				item_with = Math.floor( nav_width / items_displayed );
			} else {
				item_with = Math.floor( nav_width / items.length );
			}

			items.each( function() {
				node_width += $(this).css( {
					"width" : item_with + "px",
					"opacity" : 1
				} ).outerWidth();
			} ).parent().css( {
				"width" : node_width + "px",
				"opacity" : 1
			} );

			_visible( node );
		};

		_visible = function ( node ) {

			$(prev_scroll).remove();
			$(next_scroll).remove();

			var node_width = 0,
				fix_node_width = 0,
				items = _items( node ),
				nav_width = nav.innerWidth(),
				nav_left = nav.offset().left,
				items_displayed = _count(),
				last_visible,
				left_step = 0,
				right_step = 0;

			if ( items.length >= items_displayed ) {
				fix_node_width = node.outerWidth() / items.length * items_displayed;
			} else {
				fix_node_width = nav_width;
			}

			items.each( function() {

				// Remove style from the last visible element in node
				$(this).removeClass("last-visible");

				// Show or hide element in node
				if ( nav_left > $(this).offset().left || ( nav_left + fix_node_width ) < $(this).offset().left )
					$(this).addClass("invisible").css("opacity", 0);
				else
					$(this).removeClass("invisible").css("opacity", 1);

				// Save the last visible element in node
				if ( $(this).offset().left - nav_left + tolerance < nav_width )
					last_visible = $(this);

				// Define lefttmost hidden element in node
				if ( $(this).offset().left + $(this).outerWidth() - parseInt(nav.css("border-width")) == nav.offset().left )
					left_step = $(this).addClass("leftmost").outerWidth();
				else
					$(this).removeClass("leftmost");

				// Define rightmost hidden element in node
				if ( $(this).offset().left == nav_left + fix_node_width + parseInt(nav.css("border-width")) )
					right_step = $(this).addClass("rightmost").outerWidth();
				else
					$(this).removeClass("rightmost");

			});

			// Add style to the last visible element in node
			last_visible.addClass("last-visible");

			// Enable or disable scroll arrows
			if ( node.children(".leftmost").length == 0 ) {
				$(prev_scroll).remove();
				left_step = 0;
			} else {
				$(prev_scroll_button).css("opacity", 1).appendTo(nav);
			}

			if ( node.children(".rightmost").length == 0 ) {
				$(next_scroll).remove();
				right_step = 0;
			} else {
				$(next_scroll_button).css("opacity", 1).appendTo(nav);
			}

			_scroll( node, left_step, right_step );

		};

		_scroll = function ( node, left_step, right_step ) {

			var prev_scroll_size = 0,
				next_scroll_size = 0,
				nav_width = nav.innerWidth(),
				nav_left = nav.offset().left;

			// click
			$(prev_scroll).on("click", function(){
				prev_scroll_size = node.offset().left - parseInt(nav.css("border-width")) - nav_left + left_step;
				node.css("left", prev_scroll_size);
				_init( node );
			});

			$(next_scroll).on("click", function(){
				next_scroll_size = node.offset().left - parseInt(nav.css("border-width")) - nav_left - right_step;
				node.css("left", next_scroll_size);
				_init( node );
			});

		};


		// Displayed submenu
		$(link).on( "click", function ( event ) {
			
			// Текущее подменю
			location = $(this).next(submenu);

			if ( location.length > 0 ) {
				
				event.preventDefault();

				location.parent().addClass("navi-subviewopen").css("width", "").parent().addClass("navi-subview").css("width", "");
				_init( location );

				// Add backward button to the top menu
				nav.append(backward_button);
				$(backward).css("opacity", 1);

				// Backward on the top menu
				$(backward).on("click", function(){

					// Remove backward button
					$(this).remove();
					
					location.css( {
						"opacity" : 0
					} ).parent().removeClass("navi-subviewopen").parent().removeClass("navi-subview");
					location = nav.find(menu).css(reset)
					_init( location );
				});

				return false;
			}
			
			return true;

		});
		
		$(window).on("load resize", function () {

			// Define active node
			if ( location === undefined )
				location = nav.children(menu).css(reset);

			_init( location.css(reset) );

		});

		return this;
	}

})(jQuery);

$(document).foundation();
$("#navi_menu").naviMenu();


