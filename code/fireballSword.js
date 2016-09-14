var items = require('items');
var entities = require('entities');

function onArmSwing( event ) {
  console.log('player swing!');
  var player = event.player;
  var itemInHand = player.getItemInHand();
/*  if ( player.getHealth() == 20 && isFireballSword(itemInHand) )*/
  /*{*/
    shootFireball(player);
  //}
}

function isFireballSword( item ) {
  if (item && item.getType() == items.diamondSword() ) 
  {
    var enchantment = item.getEnchantment();
    if (enchantment && enchantment.getLevel() == 3 && 
	    enchantment.getType() == cmEnchantment.LuckOfTheSea) {
      return true;
    }
  }
  return false;
}

function shootFireball(player) {
  var eyeLoc = player.getEyeLocation();
  var fireball = player.location.getWorld().spawnEntity(eyeLoc, entities.fireball());
  fireball.setYield(0); /* prevent fireball from destroying blocks */
  fireball.setVelocity(eyeLoc.getDirection().normalize().multiply(2));
  fireball.setShooter(player);
}

events.playerInteract( onArmSwing );

function addRecipe() {
  var item = items.diamondSword(1);

  var meta = item.getItemMeta();
  meta.setDisplayName("§aFireball Sword");
  item.setItemMeta(meta);
  var bkEnchant = org.bukkit.enchantments.Enchantment;
  item.addUnsafeEnchantment(bkEnchant.LUCK, 3);

  var fireballSwordRecipe = new Object();
  fireballSwordRecipe.result = item;
  fireballSwordRecipe.shape = [ 'B',
				'B',
				'S' ];
  fireballSwordRecipe.ingredients = {
    B: items.blazeRod(1), 
    S: items.stick(1)
  };

  var recipes = require('recipes');
  var recipe = recipes.add( fireballSwordRecipe );
}

addRecipe();
