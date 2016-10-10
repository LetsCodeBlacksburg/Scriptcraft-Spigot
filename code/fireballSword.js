var items = require('items');
var entities = require('entities');
var bkEnchant = org.bukkit.enchantments.Enchantment;

function onArmSwing( event ) {
  var player = event.player;
  var itemInHand = player.getItemInHand();
  if ( player.getHealth() == 20 && isFireballSword(itemInHand) )
  {
    shootFireball(player);
  }
}

events.playerInteract( onArmSwing );

function isFireballSword( item ) {
  var luckLevel = item.getEnchantmentLevel(bkEnchant.LUCK)
  if (item.getType() == items.diamondSword() && luckLevel == 3 ) {
    return true;
  }
  return false;
}

function shootFireball(player) {
  var entityType = entities.fireball();
  var eyeLevel = player.getEyeLocation();
  var world = player.getWorld();
  var fireball = world.spawnEntity(eyeLevel, entityType);
  fireball.setYield(0); /* prevent fireball from destroying blocks */
  fireball.setVelocity(eyeLevel.getDirection().multiply(5));
  fireball.setShooter(player); /* make fireball ours so it won't explode us */
}

var item = items.diamondSword(1);

var meta = item.getItemMeta();
meta.setDisplayName("Fireball Sword");
item.setItemMeta(meta);
item.addUnsafeEnchantment(bkEnchant.LUCK, 3);

var recipe = new Object();
recipe.result = item;
recipe.shape = [ 'BDB',
		 'BDB',
		 'BSB' ];
recipe.ingredients = {
  B: items.blazeRod(1), 
  D: items.diamond(1), 
  S: items.stick(1)
};

var recipes = require('recipes');
recipes.add( recipe );
