goto Is_Enter    //Lines 0 - 8 act as an if statement
goto back       // if you jump to line 0 or less you will jump back with the offset
goto back       // if you jump to line 1-8 you jump back without the offset
goto back
goto back
goto back
goto back
goto back
goto back
goto back
goto back
goto collect  //When we jump here, 12 is pushed to adress stack     can convert an offset to an adress
goto collect  //When we jump here, 13 is pushed to adress stack
goto collect  //...
goto collect
goto collect
goto collect
goto collect
goto collect
goto collect
goto collect  //21...
collect:      //   [...,Y,X,0] [...,X+1]
goto <        //destroy offsets      [...,Y,X] [...,X+1]
goto =0       //                     [...,Y,0] [...,X+1]
goto <        //                       [...,Y] [...,X+1]
goto :0             //jump to next offset    [...,Y] [...,X+1]

//Lines 9 - 23 an offset to an adress (domain 10-19 to the range 12-21)
  // then will go back to the second last offset
  // to use this code: goto :1
  //   when called, the stacks (offset, adress) should look like: [...,Y,X] [...]

flip:
goto =0
goto <
goto =0
goto <
goto =8 //8 is start symbol
//Flip adresses back to offsets, goto 39 to use
goto next // [...,0] [...,X,37] 
goto =2    // [...,2] [...,X,37]
goto :back  // [...,2] [...,X]  jumps to 46
goto =32    // [...,31] [...,X]  //HARDCODED, this line - 10
goto :back  // [...,31] [...]   jumps to X + 31
goto +3  //case 12 //HARDCODED
goto +6  //case 13
goto +9  //case 14
//case 12
goto =0
goto put_30 //Print 0 
goto 39
//case 13
goto =1
goto put_31 //Print 1 
goto 39
//case 14
goto =0
goto <
goto getc
goto =0
goto <
goto 163 //HARDCODED start_again label

//print char on top of offset
print_char:
goto <
goto :-47
goto +10
goto +11
goto +12
goto +13
goto +14
goto +15
goto +16
goto +17
goto +18
goto +19
goto put_30
goto back
goto put_31
goto back
goto put_32
goto back
goto put_33
goto back
goto put_34
goto back
goto put_35
goto back
goto put_36
goto back
goto put_37
goto back
goto put_38


//Multiply top offset by two (0 to 3) input. Use: goto mult_by_2
mult_by_2:
goto <
goto :+1
goto +4
goto +5
goto +6
goto +7
goto =0
goto back
goto =2
goto back
goto =4
goto back
goto =6
goto back


back:   //First we have to grab the digits
goto =8  //Start symbol
//Start here
goto A
B:
goto <  //Remove two extra offsets
goto <
goto getc //Get a digit
goto next    //*//This pattern adds a new elemnet to the offset stack
goto =2      //
goto :back   //*//
goto =-47  //47 is the ASCII for '0' minus 1
goto <
//We have to check  whether its a digit or a newline(13)
goto :0
A:
goto B
//If were here, then we got a digit, and its currently on the offset stack as D+1

goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =47
goto <
goto print_char
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =-47
goto <


// We have to remove B from the address stack
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =34                      //HARDCODED //this number should equal the distance between B and // Jump to Here after removing B
goto :back  //Remove B
// Jump to Here after removing B
goto =-1 // Sub one from offset
goto <   //

goto 116      //HARDCODED //Start here line

Is_Enter: //ready to start rule 110
goto <
goto =0
goto <

start_again:
goto put_0a
// Push a 2 to the adress stack, to indicate return to here
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =start_processing
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =12  //push 2 to adress stack
goto :1
start_processing:
goto =0
goto <

goto mult_by_2
goto <
// push the first elem to the other stack
goto :+1  //Switch
           //case 0 
goto +3    //case 1
           //case 2     //HARDCODED+
goto +10   //case 3 
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =after_first_digits   //HARDCODED line: //After first special
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =10  //push 0 to adress stack
goto :1
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =after_first_digits   //HARDCODED line: //After first special
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =10  //push 0 to adress stack
goto :1

after_first_digits:
goto =0 
goto <


//Start extended processing
goto mult_by_2
goto <

//Push specific adress
goto :+1 //Switch
          //case 0
goto +15  //case 1  //HARDCODED //Push 0
          //case 2
          //case 3
          //case 4
          //case 5
goto +20  //case 6  //HARDCODED //Push 1
goto +9   //case 7  //HARDCODED //Push 0
goto +68  //case 8              //Push 0 0 then flip
goto +67  //case 9              //Push 0 1 then flip
goto +76  //case 10             //Push 1 1 then flip
goto +75  //case 11             //Push 1 1 then flip
goto +74  //case 12             //Push 1 0 then flip
goto +73  //case 13             //Push 1 1 then flip
goto +72  //case 14             //Push 1 1 then flip
goto +61  //case 15             //Push 0 1 then flip
//Push 0
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =after_regular
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =10  //push 0 to adress stack
goto :1
//Push 1
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =after_regular
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =11  //push 1 to adress stack
goto :1
//Push 0 0 then flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =push_0_then_flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =10  //push 0 to adress stack
goto :1
//Push 0 1 then flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =push_1_then_flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =10  //push 0 to adress stack
goto :1
//Push 1 0 then flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =push_0_then_flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =11  //push 1 to adress stack
goto :1
//Push 1 1 then flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =push_1_then_flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =11  //push 1 to adress stack
goto :1
push_0_then_flip:
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =10  //push 0 to adress stack
goto :1
push_1_then_flip:
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =flip
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =11  //push 1 to adress stack
goto :1












//After first regular
after_regular:

goto =0
goto <

//modulo 4
goto :+1
          //case 0
          //case 1
          //case 2
goto +10  //case 3
          //case 4
          //case 5
          //case 6
          //case 7
goto next    //*//This pattern adds a new element to the offset stack
goto =2      //
goto :back   //*//
goto =-4
goto <



goto 211 //HARDCODED //Start extended processing