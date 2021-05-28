#!/usr/bin/env python3

def opponent_get_score(self, x, y):
    temp = 0
    map_cp = self.map_copy()
    map_cp[x][y] = -1
    multiplier = 0

    for i in range(self.board_size):
        for j in range(self.board_size):
            if (map_cp[i][j] == 1):
                map_cp[i][j] = -1
            elif (map_cp[i][j] == -1):
                map_cp[i][j] = 1

    for i in range(self.board_size):
        for j in range(self.board_size - 4):
            for k in range(5):
                temp += map_cp[i][j + k]
                if (k > 3 and map_cp[i][j + k - 1] == 1 and map_cp[i][j + k - 2] == 1 and map_cp[i][j + k - 3] == 1 and map_cp[i][j + k - 4] == 1 and map_cp[i][j + k] == 1):
                    multiplier += 400
                elif (k > 2 and map_cp[i][j + k - 1] == 1 and map_cp[i][j + k - 2] == 1 and map_cp[i][j + k - 3] == 1 and map_cp[i][j + k] == 1):
                    multiplier += 200
                elif (k > 0 and map_cp[i][j + k - 1] == 1 and map_cp[i][j + k] == -1):
                    multiplier -= 3

    for i in range(self.board_size - 4):
        for j in range(self.board_size):
            for k in range(5):
                temp += map_cp[i + k][j]
                if (k > 3 and map_cp[i + k - 1][j] == 1 and map_cp[i + k - 2][j] == 1 and map_cp[i + k - 3][j] == 1 and map_cp[i + k - 4][j] == 1 and map_cp[i + k][j] == 1):
                    multiplier += 400
                elif (k > 2 and map_cp[i + k - 1][j] == 1 and map_cp[i + k - 2][j] == 1 and map_cp[i + k - 3][j] == 1 and map_cp[i + k][j] == 1):
                    multiplier += 200
                elif (k > 0 and map_cp[i + k - 1][j] == 1 and map_cp[i + k][j] == -1):
                    multiplier -= 3

    for i in range(self.board_size - 4):
        for j in range(self.board_size - 4):
            for k in range(5):
                temp += map_cp[i + k][j + k]
                if (k > 3 and map_cp[i + k - 1][j + k - 1] == 1 and map_cp[i + k - 2][j + k - 2] == 1 and map_cp[i + k - 3][j + k - 3] == 1 and map_cp[i + k - 4][j + k - 4] == 1 and map_cp[i + k][j + k] == 1):
                    multiplier += 400
                elif (k > 2 and map_cp[i + k - 1][j + k - 1] == 1 and map_cp[i + k - 2][j + k - 2] == 1 and map_cp[i + k - 3][j + k - 3] == 1 and map_cp[i + k][j + k] == 1):
                    multiplier += 200
                elif (k > 0 and map_cp[i + k - 1][j + k - 1] == 1 and map_cp[i + k][j + k] == -1):
                    multiplier -= 3

    for i in range(self.board_size - 4):
        for j in range(4, self.board_size):
            for k in range(5):
                temp += map_cp[i - k][j - k]
                if (k > 2 and map_cp[i + k - 1][j - k + 1] == 1 and map_cp[i + k - 2][j - k + 2] == 1 and map_cp[i + k - 3][j - k + 3] == 1 and map_cp[i + k - 4][j - k + 4] == 1 and map_cp[i + k][j - k] == 1):
                    multiplier += 400
                elif (k > 2 and map_cp[i + k - 1][j - k + 1] == 1 and map_cp[i + k - 2][j - k + 2] == 1 and map_cp[i + k - 3][j - k + 3] == 1 and map_cp[i + k][j - k] == 1):
                    multiplier += 200
                elif (k > 0 and map_cp[i + k - 1][j - k + 1] == 1 and map_cp[i + k][j - k] == -1):
                    multiplier -= 3
    return (temp + multiplier)


def ai_get_score(self, x, y):
    temp = 0
    map_cp = self.map_copy()
    map_cp[x][y] = 1
    multiplier = 0

    for i in range(self.board_size):
        for j in range(self.board_size - 4):
            for k in range(5):
                temp += map_cp[i][j + k]
                if (k > 3 and map_cp[i][j + k - 1] == 1 and map_cp[i][j + k - 2] == 1 and map_cp[i][j + k - 3] == 1 and map_cp[i][j + k - 4] == 1 and map_cp[i][j + k] == 1):
                    multiplier += 1000
                elif (k > 2 and map_cp[i][j + k - 1] == 1 and map_cp[i][j + k - 2] == 1 and map_cp[i][j + k - 3] == 1 and map_cp[i][j + k] == 1):
                    multiplier += 36
                elif (k > 1 and map_cp[i][j + k - 1] == 1 and map_cp[i][j + k - 2] == 1 and map_cp[i][j + k] == 1):
                    multiplier += 12
                elif (k > 0 and map_cp[i][j + k - 1] == 1 and map_cp[i][j + k] == 1):
                    multiplier += 3
                elif (k > 0 and map_cp[i][j + k - 1] == 1 and map_cp[i][j + k] == -1):
                    multiplier -= 3

    for i in range(self.board_size - 4):
        for j in range(self.board_size):
            for k in range(5):
                temp += map_cp[i + k][j]
                if (k > 3 and map_cp[i + k - 1][j] == 1 and map_cp[i + k - 2][j] == 1 and map_cp[i + k - 3][j] == 1 and map_cp[i + k - 4][j] == 1 and map_cp[i + k][j] == 1):
                    multiplier += 1000
                elif (k > 2 and map_cp[i + k - 1][j] == 1 and map_cp[i + k - 2][j] == 1 and map_cp[i + k - 3][j] == 1 and map_cp[i + k][j] == 1):
                    multiplier += 36
                elif (k > 1 and map_cp[i + k - 1][j] == 1 and map_cp[i + k - 2][j] == 1 and map_cp[i + k][j] == 1):
                    multiplier += 12
                elif (k > 0 and map_cp[i + k - 1][j] == 1 and map_cp[i + k][j] == 1):
                    multiplier += 3
                elif (k > 0 and map_cp[i + k - 1][j] == 1 and map_cp[i + k][j] == -1):
                    multiplier -= 3

    for i in range(self.board_size - 4):
        for j in range(self.board_size - 4):
            for k in range(5):
                temp += map_cp[i + k][j + k]
                if (k > 3 and map_cp[i + k - 1][j + k - 1] == 1 and map_cp[i + k - 2][j + k - 2] == 1 and map_cp[i + k - 3][j + k - 3] == 1 and map_cp[i + k - 4][j + k - 4] == 1 and map_cp[i + k][j + k] == 1):
                    multiplier += 1000
                elif (k > 2 and map_cp[i + k - 1][j + k - 1] == 1 and map_cp[i + k - 2][j + k - 2] == 1 and map_cp[i + k - 3][j + k - 3] == 1 and map_cp[i + k][j + k] == 1):
                    multiplier += 36
                elif (k > 1 and map_cp[i + k - 1][j + k - 1] == 1 and map_cp[i + k - 2][j + k - 2] == 1 and map_cp[i + k][j + k] == 1):
                    multiplier += 12
                elif (k > 0 and map_cp[i + k - 1][j + k - 1] == 1 and map_cp[i + k][j + k] == 1):
                    multiplier += 3
                elif (k > 0 and map_cp[i + k - 1][j + k - 1] == 1 and map_cp[i + k][j + k] == -1):
                    multiplier -= 3

    for i in range(self.board_size - 4):
        for j in range(4, self.board_size):
            for k in range(5):
                temp += map_cp[i - k][j - k]
                if (k > 2 and map_cp[i + k - 1][j - k + 1] == 1 and map_cp[i + k - 2][j - k + 2] == 1 and map_cp[i + k - 3][j - k + 3] == 1 and map_cp[i + k - 4][j - k + 4] == 1 and map_cp[i + k][j - k] == 1):
                    multiplier += 1000
                elif (k > 2 and map_cp[i + k - 1][j - k + 1] == 1 and map_cp[i + k - 2][j - k + 2] == 1 and map_cp[i + k - 3][j - k + 3] == 1 and map_cp[i + k][j - k] == 1):
                    multiplier += 36
                elif (k > 1 and map_cp[i + k - 1][j - k + 1] == 1 and map_cp[i + k - 2][j - k + 2] == 1 and map_cp[i + k][j - k] == 1):
                    multiplier += 12
                elif (k > 0 and map_cp[i + k - 1][j - k + 1] == 1 and map_cp[i + k][j - k] == 1):
                    multiplier += 3
                elif (k > 0 and map_cp[i + k - 1][j - k + 1] == 1 and map_cp[i + k][j - k] == -1):
                    multiplier -= 3
    return (temp + multiplier)
