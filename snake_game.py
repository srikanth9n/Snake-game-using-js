import pygame
import random

# Initialize Pygame
pygame.init()

# Screen settings
WIDTH, HEIGHT = 600, 400
CELL_SIZE = 20  # Snake and food size
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Snake Game 🐍")

# Colors
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLACK = (0, 0, 0)

# Snake and food settings
snake = [(100, 100), (80, 100), (60, 100)]  # Initial snake
direction = "RIGHT"
food = (random.randrange(0, WIDTH, CELL_SIZE), random.randrange(0, HEIGHT, CELL_SIZE))

# Game variables
clock = pygame.time.Clock()
score = 0
font = pygame.font.Font(None, 35)

def draw_snake(snake):
    for segment in snake:
        pygame.draw.rect(screen, GREEN, pygame.Rect(segment[0], segment[1], CELL_SIZE, CELL_SIZE))

def draw_food(food):
    pygame.draw.rect(screen, RED, pygame.Rect(food[0], food[1], CELL_SIZE, CELL_SIZE))

def show_score():
    text = font.render(f"Score: {score}", True, WHITE)
    screen.blit(text, (10, 10))

# Game loop
running = True
while running:
    screen.fill(BLACK)
    
    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP and direction != "DOWN":
                direction = "UP"
            elif event.key == pygame.K_DOWN and direction != "UP":
                direction = "DOWN"
            elif event.key == pygame.K_LEFT and direction != "RIGHT":
                direction = "LEFT"
            elif event.key == pygame.K_RIGHT and direction != "LEFT":
                direction = "RIGHT"

    # Move the snake
    x, y = snake[0]
    if direction == "UP":
        y -= CELL_SIZE
    elif direction == "DOWN":
        y += CELL_SIZE
    elif direction == "LEFT":
        x -= CELL_SIZE
    elif direction == "RIGHT":
        x += CELL_SIZE

    new_head = (x, y)
    snake.insert(0, new_head)

    # Check for collision (walls or itself)
    if (x < 0 or x >= WIDTH or y < 0 or y >= HEIGHT or new_head in snake[1:]):
        print("Game Over! Final Score:", score)
        running = False

    # Check if snake eats food
    if new_head == food:
        score += 1
        food = (random.randrange(0, WIDTH, CELL_SIZE), random.randrange(0, HEIGHT, CELL_SIZE))
    else:
        snake.pop()  # Remove last segment to keep length same

    # Draw everything
    draw_snake(snake)
    draw_food(food)
    show_score()

    # Refresh screen
    pygame.display.flip()
    clock.tick(10)  # Control game speed

pygame.quit()
