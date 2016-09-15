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
  if (item.getType() == items.diamondSword() && luckLevel == 3 ) 
  {
    return true;
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

function addRecipe() {
  var item = items.diamondSword(1);

  var meta = item.getItemMeta();
  meta.setDisplayName("Fireball Sword");
  item.setItemMeta(meta);
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
