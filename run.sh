#!/bin/bash
CWD="$(pwd)"

chmod +x run1.sh

chmod +x run2.sh

gnome-terminal --geometry=104x29+0+588 --working-directory=$CWD -- ./run2.sh

gnome-terminal --geometry=104x29+0+588 --working-directory=$CWD -- ./run1.sh
