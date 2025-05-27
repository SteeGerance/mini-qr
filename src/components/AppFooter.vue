<script setup lang="ts">
import { marked } from 'marked'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { X } from 'lucide-vue-next'

const { t } = useI18n()
const version = ref('...')
const changelogContent = ref<string | null>(null)
const isLoading = ref(true)

async function fetchAndProcessChangelog() {
  if (changelogContent.value === null) {
    isLoading.value = true
    try {
      const response = await fetch('/CHANGELOG.md')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const markdown = await response.text()

      const versionMatch = markdown.match(/^##\s+(v\d+\.\d+\.\d+)/m)
      if (versionMatch && versionMatch[1]) {
        version.value = versionMatch[1]
      } else {
        version.value = 'N/A'
      }

      changelogContent.value = await marked.parse(markdown)
    } catch (error) {
      console.error('Failed to fetch or process changelog:', error)
      version.value = t('Error')
      changelogContent.value = `<p>${t('Failed to load changelog')}</p>`
    } finally {
      isLoading.value = false
    }
  }
}

onMounted(() => {
  fetchAndProcessChangelog()
})
</script>

<template>
  
</template>

<style scoped>
/* Restore original footer background styles */
footer {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.dark footer {
  background: rgba(24, 24, 27, 0.8);
}
</style>
