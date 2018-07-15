pragma solidity ^0.4.11;
contract Now{
   uint start;
   uint end;
   function start(){
      start = now;
   } 
   function end(){
      end = now;
   } 
   function getTimeDif() returns(uint){
      return end - start;
   }     
}