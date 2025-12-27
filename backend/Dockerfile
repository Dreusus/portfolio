FROM python:3.12-slim

WORKDIR /app

# Копируем requirements первым для кэширования слоя
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь код
COPY . .

EXPOSE 8000

CMD ["python", "main.py"]
