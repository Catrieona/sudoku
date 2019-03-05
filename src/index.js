module.exports = function solveSudoku(matrix) {

    let empty = [];

    for(var i=0;i<matrix.length;i++){
      for(var j=0;j<matrix[i].length;j++){
        if(matrix[i][j] == 0){
          empty.push([i,j]);
        }
      }
    }

    function solve(board, emptyPositions) {
      var limit = 9, i, row, column, value, found;
      for(i = 0; i < emptyPositions.length;) {
        row = emptyPositions[i][0];
        column = emptyPositions[i][1];
        value = board[row][column] + 1;
        found = false;
        while(!found && value <= limit) {
          if(checkValue(board, column, row, value)) {
            found = true;
            board[row][column] = value;
            i++;
          } else {
            value++;
          }
        }
        if(!found) {
          board[row][column] = 0;
          i--;
        }
      }
    }

    function checkValue(board, column, row, value) {
      if(checkRow(board, row, value) &&
        checkColumn(board, column, value) &&
        check3x3Square(board, column, row, value)) {
        return true;
      } else {
        return false;
      }
    };

    function check3x3Square(board, column, row, value) {
      var columnCorner = 0,
          rowCorner = 0,
          squareSize = 3;
    
      while(column >= columnCorner + squareSize) {
        columnCorner += squareSize;
      }
    
      while(row >= rowCorner + squareSize) {
        rowCorner += squareSize;
      }
    
      for(var i = rowCorner; i < rowCorner + squareSize; i++) {
        for(var j = columnCorner; j < columnCorner + squareSize; j++) {
          if(board[i][j] === value) {        
            return false;
          }
        }
      }
      return true;
    };

    function checkColumn(board, column, value) {
      for(var i = 0; i < board.length; i++) {
        if(board[i][column] === value) {
          return false;
        }
      }      
      return true;
    };

    function checkRow(board, row, value) {     
      for(var i = 0; i < board[row].length; i++) {        
        if(board[row][i] === value) {
          return false;
        }
      }     
      return true;
    };

    solve(matrix,empty);

  return matrix;
}
