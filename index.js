var _value=0;
function check_value(value)
{
  if((value>999)||(value<0))
  {
    document.getElementById("x").style = "display:initial; color:red; font-size:33%;";
    document.getElementById("number").value = _value;
  }
  else
  {
    document.getElementById("x").style="display:none; color:red; font-size:33%;";
    _value=document.getElementById("number").value;
  }
}
function ShowRandomNumber()
{
  document.getElementById('a').value=Math.floor(Math.random()*parseInt(document.getElementById("number").value)+1);
}