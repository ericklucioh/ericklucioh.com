.PHONY: help install dev build preview start lint clean

help:
	@echo "Targets:"
	@echo "  make install   # install deps (npm ci)"
	@echo "  make dev       # next dev"
	@echo "  make build     # next build (static export -> out/)"
	@echo "  make preview   # serve ./out on http://localhost:4173"
	@echo "  make start     # next start (SSR, not used for export)"
	@echo "  make lint      # next lint"
	@echo "  make clean     # remove build outputs"

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

start:
	npm run start

lint:
	npm run lint

clean:
	rm -rf .next out
