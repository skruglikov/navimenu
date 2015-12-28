<?
	$arResult = array(
		'fabric'=>array(
			'LINK'=>'catalog',
			'NAME'=>'Fabric',
			'SUBNAV'=>array(
				'sale'=>array('LINK'=>'catalog','NAME'=>'Sale'),
				'workwear'=>array('LINK'=>'catalog','NAME'=>'Workwear'),
				'special'=>array('LINK'=>'catalog','NAME'=>'Special'),
				'military'=>array('LINK'=>'catalog','NAME'=>'Military'),
				'textile'=>array('LINK'=>'catalog','NAME'=>'Textile'),
				'tape'=>array('LINK'=>'catalog','NAME'=>'Tape'),
				'yarn'=>array('LINK'=>'catalog','NAME'=>'Yarn'),
			),
		),
		'brands'=>array('LINK'=>'category','NAME'=>'Brands'),
		'samples'=>array('LINK'=>'samples','NAME'=>'Samples'),
		'showroom'=>array('LINK'=>'showroom','NAME'=>'Showroom'),
		'prices'=>array('LINK'=>'prices','NAME'=>'Prices'),
		'stores'=>array('LINK'=>'stores','NAME'=>'Stores'),
		'calc'=>array('LINK'=>'calculation','NAME'=>'Calc'),
		'help'=>array('LINK'=>'help','NAME'=>'Help'),
	);
?>


<!doctype html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Navi for Teksika</title>
	<link rel="stylesheet" href="stylesheets/app.css" />
	<script src="bower_components/modernizr/modernizr.js"></script>
</head>
<body>
	<div class="row">
		<div class="large-12 column">
			<h1>Navi menu for Teksika</h1>
		</div>
	</div>
	<div class="row">
		<div class="large-12 column">
			<nav id="navi_menu" class="navi navi-inline">
				<ul class="navi-menu">
					<?foreach($arResult as $key => $arItem):?>
						<li id="<?=$arItem["PARAMS"]["CODE"]?>" class="navi-item"><a class="navi-title <?=$arItem["SELECTED"] ? 'active' : '' ?>" href="<?= $arItem["PARAMS"]["CODE"] == 'catalog' ? 'javascript:void(0)': $arItem["LINK"]?>"><span class="navi-image"><img src="/images/navimenu/navi_<?=$key?>.svg" /></span><span class="navi-label"><?=$arItem["NAME"]?></span></a>
							<?if($arItem["SUBNAV"]):?>
								<ul class="navi-submenu">
									<?foreach($arItem["SUBNAV"] as $key => $arItemSub):?>
										<li id="<?=$arItemSub["PARAMS"]["CODE"]?>" class="navi-item"><a class="navi-title" href="<?=$arItemSub["LINK"]?>"><span class="navi-image"><img src="/images/navimenu/navi_<?=$key?>.svg" /></span><span class="navi-label"><?=$arItemSub["NAME"]?></span></a></li>
									<?endforeach?>
								</ul>
							<?endif;?>
						</li>
					<?endforeach?>
				</ul>
			</nav>
		</div>
	</div>
	<br>

	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<script src="bower_components/foundation/js/foundation.js"></script>
	<script src="js/app.js"></script>
</body>
</html>