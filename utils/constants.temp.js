export const original = `
# Original Code
def main():
    print("Starting the program...")

    for i in range(1, 101):
        if i % 2 == 0:
            print(f"{i} is even.")
        else:
            print(f"{i} is odd.")

    data = [i for i in range(1, 101)]
    total_sum = sum(data)
    print(f"Sum of numbers: {total_sum}")

    # Function to calculate factorial
    def factorial(n):
        if n == 0:
            return 1
        result = 1
        for i in range(1, n + 1):
            result *= i
        return result

    print(f"Factorial of 5: {factorial(5)}")

    # Handling a simple list
    fruits = ["apple", "banana", "cherry", "date"]
    for fruit in fruits:
        print(f"I like {fruit}")

    # Nested loops for matrix
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    for row in matrix:
        for element in row:
            print(f"Element: {element}")

    # Working with strings
    sentence = "The quick brown fox jumps over the lazy dog"
    words = sentence.split()
    for word in words:
        print(f"Word: {word}")

    # Simple number operations
    a = 10
    b = 20
    print(f"Sum of {a} and {b} is {a + b}")

    # Create a list of even numbers
    evens = [i for i in range(2, 101, 2)]
    print(f"Even numbers: {evens}")

    # Dictionary operations
    info = {"name": "John", "age": 30, "city": "New York"}
    for key, value in info.items():
        print(f"{key}: {value}")

    # Class definition
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age

        def greet(self):
            return f"Hello, my name is {self.name} and I am {self.age} years old."

    person = Person("Alice", 25)
    print(person.greet())

    # Reading and writing files
    with open("sample.txt", "w") as f:
        f.write("This is a sample text.")

    with open("sample.txt", "r") as f:
        content = f.read()
        print(content)

    # Sorting a list
    unsorted_list = [5, 1, 9, 3, 7, 2]
    sorted_list = sorted(unsorted_list)
    print(f"Sorted list: {sorted_list}")

    # Simple loop example
    for i in range(10):
        print(f"Number {i}")

    # Function with multiple parameters
    def multiply(a, b):
        return a * b

    result = multiply(3, 4)
    print(f"Multiplication result: {result}")

    # Working with sets
    unique_numbers = {1, 2, 3, 4, 5}
    unique_numbers.add(6)
    print(f"Unique numbers: {unique_numbers}")

    # Lambda function
    square = lambda x: x * x
    print(f"Square of 4: {square(4)}")

    # Try-except block
    try:
        number = int(input("Enter a number: "))
    except ValueError:
        print("Invalid input, please enter a valid number.")

    # Fibonacci sequence
    def fibonacci(n):
        if n == 0:
            return 0
        elif n == 1:
            return 1
        else:
            return fibonacci(n - 1) + fibonacci(n - 2)

    print(f"Fibonacci of 5: {fibonacci(5)}")

if __name__ == "__main__":
    main()
`

export const modified = `
# Modified Code
def start_program():
    print("Initializing the program...")

    for i in range(1, 101):
        if i % 2 != 0:
            print(f"Odd number: {i}")
        else:
            print(f"Even number: {i}")

    data = [i for i in range(1, 101)]

    total_sum = sum(data)
    print(f"Total sum of list: {total_sum}")

    # Factorial computation
    def calculate_factorial(n):
        if n == 0:
            return 1
        result = 1
        for i in range(1, n + 1):
            result *= i
        return result

    print(f"Factorial of 6: {calculate_factorial(6)}")

    # Handle fruits list
    fruits = ["orange", "banana", "grapes", "date"]
    for fruit in fruits:
        print(f"Enjoying {fruit}")

    # Matrix manipulation
    matrix = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]
    for row in matrix:
        for item in row:
            print(f"Item: {item}")

    # Process sentence
    sentence = "A quick brown fox jumps over the lazy dog"
    words = sentence.split()
    for word in words:
        print(f"Extracted word: {word}")

    # Simple math
    x, y = 15, 25
    print(f"Sum of {x} and {y}: {x + y}")

    # Generate list of even numbers
    even_numbers = [i for i in range(2, 101, 2)]
    print(f"Even numbers generated: {even_numbers}")

    # Working with a dictionary
    user_info = {"name": "Alice", "age": 28, "location": "California"}
    for key, value in user_info.items():
        print(f"{key}: {value}")

    # Person class
    class Individual:
        def __init__(self, name, age):
            self.name = name
            self.age = age

        def introduce(self):
            return f"Hi, I'm {self.name} and I'm {self.age} years old."

    individual = Individual("Bob", 32)
    print(individual.introduce())

    # File operations
    with open("example.txt", "w") as file:
        file.write("This is an example text file.")

    with open("example.txt", "r") as file:
        content = file.read()
        print(content)

    # Sorting numbers
    unordered_list = [8, 3, 4, 6, 1]
    ordered_list = sorted(unordered_list)
    print(f"Sorted numbers: {ordered_list}")

    # Loop demonstration
    for i in range(5):
        print(f"Loop index {i}")

    # Function with arguments
    def division(a, b):
        return a / b

    division_result = division(20, 4)
    print(f"Division result: {division_result}")

    # Working with sets
    unique_elements = {1, 2, 3, 4, 5}
    unique_elements.add(7)
    print(f"Set elements: {unique_elements}")

    # Lambda function
    double = lambda x: x * 2
    print(f"Double of 5: {double(5)}")

    # Exception handling
    try:
        value = int(input("Enter a number: "))
    except ValueError:
        print("Please enter a valid integer.")

    # Fibonacci sequence
    def fibonacci_sequence(n):
        if n == 0:
            return 0
        elif n == 1:
            return 1
        else:
            return fibonacci_sequence(n - 1) + fibonacci_sequence(n - 2)

    print(f"Fibonacci of 6: {fibonacci_sequence(6)}")

if __name__ == "__main__":
    start_program()
`
