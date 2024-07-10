#!/bin/bash

# Writes Prisma schema to readme
awk -v content="$(tail -n +10 ./prisma/schema.prisma)" '
/```prisma/       {in_block=1; print $0, "\n", content; next}
/```/ && in_block {in_block=0; print $0;                next}
!in_block
' readme.md > temp && mv temp readme.md

# Copy .env.example to .env
if [ ! -f .env.example ]; then
  echo '.env.example not found'
  exit 1
fi

cp .env.example .env
