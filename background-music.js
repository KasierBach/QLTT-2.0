class BackgroundMusic {
  constructor(audioSrc, options = {}) {
    this.audio = new Audio(audioSrc)
    this.audio.loop = options.loop !== undefined ? options.loop : true
    this.audio.volume = options.volume !== undefined ? options.volume : 0.5
    this.isPlaying = false

    // Create control UI
    this._createControls()

    // Optional: auto play on user interaction
    this._setupAutoPlay()
  }

  _setupAutoPlay() {
    const playAudio = () => {
      if (!this.isPlaying) {
        this.audio.play().then(() => {
          this.isPlaying = true
          this._updateToggleButton()
        }).catch((e) => {
          console.log("Background music autoplay blocked:", e)
        })
      }
      window.removeEventListener('click', playAudio)
      window.removeEventListener('keydown', playAudio)
    }
    window.addEventListener('click', playAudio)
    window.addEventListener('keydown', playAudio)
  }

  play() {
    if (!this.isPlaying) {
      this.audio.play()
      this.isPlaying = true
      this._updateToggleButton()
    }
  }

  pause() {
    if (this.isPlaying) {
      this.audio.pause()
      this.isPlaying = false
      this._updateToggleButton()
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  setVolume(volume) {
    this.audio.volume = volume
  }

  _createControls() {
    // Create container div
    this.controlsContainer = document.createElement('div')
    this.controlsContainer.id = 'background-music-controls'
    this.controlsContainer.style.position = 'fixed'
    this.controlsContainer.style.bottom = '20px'
    this.controlsContainer.style.left = '50%'
    this.controlsContainer.style.transform = 'translateX(-50%)'
    this.controlsContainer.style.backgroundColor = '#f0f0f0'
    this.controlsContainer.style.color = '#222'
    this.controlsContainer.style.padding = '8px 16px'
    this.controlsContainer.style.borderRadius = '8px'
    this.controlsContainer.style.display = 'flex'
    this.controlsContainer.style.alignItems = 'center'
    this.controlsContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
    this.controlsContainer.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    this.controlsContainer.style.userSelect = 'none'
    this.controlsContainer.style.zIndex = '10000'
    this.controlsContainer.style.width = '450px'
    
    // Play/Pause button
    this.toggleButton = document.createElement('button')
    this.toggleButton.textContent = '▶️'
    this.toggleButton.style.background = 'transparent'
    this.toggleButton.style.border = 'none'
    this.toggleButton.style.fontSize = '20px'
    this.toggleButton.style.cursor = 'pointer'
    this.toggleButton.style.marginRight = '12px'
    this.toggleButton.title = 'Play/Pause'
    this.toggleButton.addEventListener('click', () => this.toggle())

    // Progress bar (seek)
    this.seekBar = document.createElement('input')
    this.seekBar.type = 'range'
    this.seekBar.min = '0'
    this.seekBar.max = '100'
    this.seekBar.value = '0'
    this.seekBar.step = '0.1'
    this.seekBar.title = 'Seek audio'
    this.seekBar.style.flexGrow = '1'
    this.seekBar.style.marginRight = '12px'
    this.seekBar.style.cursor = 'pointer'

    this.seekBar.addEventListener('input', (e) => {
      const seekTo = (parseFloat(e.target.value) / 100) * this.audio.duration
      this.audio.currentTime = seekTo
    })

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration) {
        const progress = (this.audio.currentTime / this.audio.duration) * 100
        this.seekBar.value = progress
        this._updateTimeDisplay()
      }
    })

    // Volume slider
    this.volumeSlider = document.createElement('input')
    this.volumeSlider.type = 'range'
    this.volumeSlider.min = '0'
    this.volumeSlider.max = '1'
    this.volumeSlider.step = '0.01'
    this.volumeSlider.value = this.audio.volume
    this.volumeSlider.title = 'Volume'
    this.volumeSlider.style.width = '80px'
    this.volumeSlider.style.cursor = 'pointer'

    this.volumeSlider.addEventListener('input', (e) => {
      this.setVolume(parseFloat(e.target.value))
    })

    // Time display
    this.timeDisplay = document.createElement('span')
    this.timeDisplay.textContent = '00:00 / 00:00'
    this.timeDisplay.style.marginLeft = '12px'
    this.timeDisplay.style.fontSize = '14px'
    this.timeDisplay.style.minWidth = '90px'
    this.timeDisplay.style.textAlign = 'center'
    this.timeDisplay.style.userSelect = 'none'

    // Show/Hide button
    this.showHideButton = document.createElement('button')
    this.showHideButton.textContent = '🎵'
    this.showHideButton.title = 'Show/Hide Music Controls'
    this.showHideButton.style.position = 'fixed'
    this.showHideButton.style.bottom = '40px'
    this.showHideButton.style.left = '91%'
    this.showHideButton.style.transform = 'translateX(-50%)'
    this.showHideButton.style.backgroundColor = '#00adb5'
    this.showHideButton.style.color = '#fff'
    this.showHideButton.style.border = 'none'
    this.showHideButton.style.borderRadius = '50%'
    this.showHideButton.style.width = '40px'
    this.showHideButton.style.height = '40px'
    this.showHideButton.style.cursor = 'pointer'
    this.showHideButton.style.zIndex = '10001'
    this.showHideButton.style.fontSize = '22px'
    this.showHideButton.style.userSelect = 'none'
    this.showHideButton.style.boxShadow = '0 4px 14px rgba(0, 173, 181, 0.6)'
    this.showHideButton.style.display = 'none'

    this.showHideButton.addEventListener('click', () => {
      if (this.controlsContainer.style.display === 'none') {
        this.controlsContainer.style.display = 'flex'
        this.showHideButton.style.display = 'none'
      }
    })

    // Close button for controls container
    this.closeButton = document.createElement('button')
    this.closeButton.textContent = '✖'
    this.closeButton.title = 'Hide Music Controls'
    this.closeButton.style.background = 'transparent'
    this.closeButton.style.border = 'none'
    this.closeButton.style.color = '#00adb5'
    this.closeButton.style.fontSize = '20px'
    this.closeButton.style.cursor = 'pointer'
    this.closeButton.style.marginLeft = '12px'
    this.closeButton.style.userSelect = 'none'

    this.closeButton.addEventListener('click', () => {
      this.controlsContainer.style.display = 'none'
      this.showHideButton.style.display = 'block'
    })

    // Append elements
    this.controlsContainer.appendChild(this.toggleButton)
    this.controlsContainer.appendChild(this.seekBar)
    this.controlsContainer.appendChild(this.volumeSlider)
    this.controlsContainer.appendChild(this.timeDisplay)
    this.controlsContainer.appendChild(this.closeButton)

    // Append to body
    document.body.appendChild(this.controlsContainer)
    document.body.appendChild(this.showHideButton)

    this._updateToggleButton()
    this._updateTimeDisplay()
  }

  _updateToggleButton() {
    if (this.isPlaying) {
      this.toggleButton.textContent = '⏸️'
    } else {
      this.toggleButton.textContent = '▶️'
    }
  }

  _updateTimeDisplay() {
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    const currentTime = formatTime(this.audio.currentTime)
    const duration = formatTime(this.audio.duration || 0)
    this.timeDisplay.textContent = `${currentTime} / ${duration}`
  }
}
