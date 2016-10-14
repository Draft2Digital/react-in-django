# react-in-django
This is just a sample project that demonstrates one way to have a multi-page application in Django that uses React for some (but not all) of the components on the site.

To get everything installed (on Linux Mint 18), I ran:

    mkdir ~/bin

I downloaded node (nodejs.org) and installed it in my ~/bin
directory, then added the following line to ~/.bashrc (make
sure to update for the version of node you download):

    export PATH=$HOME/bin:$HOME/bin/node-v4.5.0-linux-x64/bin:$PATH

Then I ran:

    sudo apt install build-essential python-setuptools python-pip python-virtualenv virtualenv python-dev

    sudo pip install --upgrade pip
    sudo pip install virtualenvwrapper
    mkdir $/.virtualenvs

    echo 'export WORKON_HOME=$HOME/.virtualenvs' >> ~/.bashrc
    echo 'source /usr/local/bin/virtualenvwrapper.sh' >> ~/.bashrc

To make it apply to THIS terminal session:

    export WORKON_HOME=$HOME/.virtualenvs
    source /usr/local/bin/virtualenvwrapper.sh

    mkvirtualenv react-in-django
    pip install -r requirements.txt
    npm install
