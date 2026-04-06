.PHONY: help install dev build preview start lint lint-fix format format-check fmt fmt-check clean

help:
	@echo "Targets:"
	@echo "  make install   # install deps (npm ci)"
	@echo "  make dev       # next dev"
	@echo "  make build     # next build (static export -> out/)"
	@echo "  make preview   # serve ./out on http://localhost:4173"
	@echo "  make start     # next start (SSR, not used for export)"
	@echo "  make lint      # eslint ."
	@echo "  make lint-fix  # eslint . --fix"
	@echo "  make format    # prettier --write ."
	@echo "  make fmt       # alias for format"
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

lint-fix:
	npm run lint:fix

format:
	npm run format

format-check:
	npm run format:check

fmt: format

fmt-check: format-check

clean:
	rm -rf .next out
