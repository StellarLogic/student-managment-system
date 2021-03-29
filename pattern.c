#include <stdio.h>

int main()
{
    int n;

    printf("Enter number of lines: ");
    scanf("%d", &n);

    printf("\n");

    // loop for line number of lines
    for (int i = n; i >= 1; i--)
    {
        // loop to print leading spaces in each line
        for (int space = n - i; space >= 1; space--)
        {
            printf("   ");
        }

        // loop to print *
        for (int j = i * 2 - 1; j >= 1; j--)
        {
            printf(" %d ", j);
        }

        printf("\n");
    }

    return 0;
}