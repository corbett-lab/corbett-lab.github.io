goto end
goto back
goto back
goto back
goto back
goto back
goto back
goto back
goto back
goto back
back: 
goto =-48   //We want to subtract the ascii value to get the digit, minus 1
goto getc
goto <      //combine ascii char and -49
goto A      //push the line 15 to the address stack, and a 0 to the offset stack
goto -1
A:          //offset stack is [c,0] and adress stack is [0,15]
goto =-1
goto <      //subtract one from counter
goto put_58 //Print X
goto :0     //Jump to the offset line number, if its 0 we end, otherwise we go back to line 15