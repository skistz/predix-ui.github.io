#!/bin/bash

vulcanize _index.html -o index.html --inline-scripts --inline-css --strip-comments
vulcanize _getting_started.html -o getting_started.html --inline-scripts --inline-css --strip-comments
vulcanize _landing_page.html -o landing_page.html --inline-scripts --inline-css --strip-comments
